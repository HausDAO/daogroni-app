import { utils as Web3Utils } from 'web3';
import { chainByID, supportedChains } from './chain';
import { isSameAddress } from './general';
import { MINION_TYPES } from './proposalUtils';
import { fetchSafeDetails } from './requests';
import { FORM } from '../data/forms';
import { VAULT_TRANSFER_TX } from '../data/transferContractTx';
import { getReadableBalance } from './tokenValue';

export const getVaultERC20s = (daoVaults, vaultAddress, localTokenAddress) => {
  const erc20s = daoVaults?.find(vault =>
    isSameAddress(vault.address, vaultAddress),
  )?.erc20s;
  return localTokenAddress && erc20s.length
    ? erc20s.filter(erc20 => erc20.tokenAddress === localTokenAddress)
    : erc20s;
};

export const getTokenFromList = (erc20s, tokenAddress) =>
  erc20s?.find(token => isSameAddress(token.contractAddress, tokenAddress));

export const getReadableBalanceFromList = (erc20s, tokenAddress) =>
  getReadableBalance(getTokenFromList(erc20s, tokenAddress));

export const getTokenData = (daoVaults, vaultAddress, tokenAddress) => {
  const tokenData = getTokenFromList(
    getVaultERC20s(daoVaults, vaultAddress),
    tokenAddress,
  );
  return tokenData;
};

const vaultTokenAddressKey = vaultType => {
  switch (vaultType) {
    case 'treasury': {
      return 'tokenAddress';
    }
    default: {
      return 'contractAddress';
    }
  }
};

export const vaultUrlPart = vault => {
  return vault.type === 'treasury' ? `treasury` : `minion/${vault.address}`;
};

export const vaultTokenCount = vaults => {
  const addresses = vaults.flatMap(vault => {
    return vault.erc20s.map(t => t[vaultTokenAddressKey(vault.type)]);
  });

  return new Set([...addresses]).size;
};

export const getCurrentPrices = vaults => {
  return vaults.reduce((priceMap, vault) => {
    vault.erc20s.forEach(token => {
      priceMap[token[vaultTokenAddressKey(vault.type)]] = token;
    });
    return priceMap;
  }, {});
};

export const formatNativeData = (daochain, balance) => {
  return [
    {
      isNative: true,
      totalUSD: 0,
      usd: 0,
      id: daochain,
      logoUri: '',
      tokenAddress: daochain,
      tokenBalance: balance,
      decimals: '18',
      tokenName: supportedChains[daochain].nativeCurrency,
      symbol: supportedChains[daochain].nativeCurrency,
    },
  ];
};

const tokenFormsString = {
  erc20: 'MINION_SEND_ERC20_TOKEN',
  erc721: 'MINION_SEND_ERC721_TOKEN',
  erc1155: 'MINION_SEND_ERC1155_TOKEN',
  network: 'MINION_SEND_NETWORK_TOKEN',
  sellNifty: 'MINION_SELL_NIFTY',
};

export const getNftType = (nft, typeOverride) => {
  if (typeOverride) return typeOverride;
  return nft.type === 'ERC-1155' ? 'erc1155' : 'erc721';
};

export const getMinionActionFormLego = (tokenType, vaultMinionType) => {
  const formLego = FORM[`${tokenFormsString[tokenType]}`];

  if (vaultMinionType === MINION_TYPES.NIFTY) {
    return {
      ...formLego,
      minionType: MINION_TYPES.NIFTY,
      tx: VAULT_TRANSFER_TX[`${tokenFormsString[tokenType]}_NIFTY`],
    };
  }
  if (vaultMinionType === MINION_TYPES.SAFE) {
    return {
      ...formLego,
      minionType: MINION_TYPES.SAFE,
      tx: VAULT_TRANSFER_TX[`${tokenFormsString[tokenType]}_SAFE`],
    };
  }

  return formLego;
};

export const vaultFilterOptions = [
  {
    name: 'All Vaults',
    value: 'all',
  },
  {
    name: 'Treasury',
    value: 'treasury',
  },
  {
    name: 'Minion',
    value: 'minion',
  },
];

export const getVaultListData = (minion, daochain, daoid) => {
  if (!minion?.minionType) return 'minon';
  switch (minion.minionType) {
    case MINION_TYPES.SUPERFLUID:
      return {
        badgeColor: 'green',
        badgeTextColor: 'white',
        badgeName: 'SF',
        badgeVariant: 'solid',
        url: `/dao/${daochain}/${daoid}/settings/superfluid-minion/${minion.minionAddress}`,
      };
    case MINION_TYPES.UBER:
      return {
        badgeColor: 'purple',
        badgeTextColor: 'white',
        badgeName: 'UHS',
        badgeVariant: 'solid',
        url: `/dao/${daochain}/${daoid}/allies`,
      };
    case MINION_TYPES.NIFTY:
      return {
        badgeColor: 'orange',
        badgeTextColor: 'white',
        badgeName: 'NIFTY',
        badgeVariant: 'solid',
        url: `/dao/${daochain}/${daoid}/vaults/minion/${minion.minionAddress}`,
      };
    case MINION_TYPES.SAFE:
      return {
        badgeColor: 'pink',
        badgeTextColor: '#632b16',
        badgeName: 'GNOSIS SAFE',
        badgeVariant: 'outline',
        url: `/dao/${daochain}/${daoid}/vaults/minion/${minion.minionAddress}`,
      };
    default:
      return {
        badgeColor: 'white',
        badgeTextColor: 'black',
        badgeName: 'Vanilla',
        badgeVariant: 'solid',
        url: `/dao/${daochain}/${daoid}/vaults/minion/${minion.minionAddress}`,
      };
  }
};

export const validateSafeMinion = async (chainId, vault) => {
  try {
    const safeDetails = await fetchSafeDetails(
      chainByID(chainId).networkAlt || chainByID(chainId).network,
      vault,
    );

    return {
      isMinionModule: safeDetails.modules.includes(
        Web3Utils.toChecksumAddress(vault.address),
      ),
      safeDetails,
    };
  } catch (error) {
    console.error(error);
    return {
      isMinionModule: false,
    };
  }
};
