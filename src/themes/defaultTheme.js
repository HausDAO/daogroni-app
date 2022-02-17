import { rgba } from 'polished';

import BrandImg from '../assets/img/Daohaus__Castle--Dark.svg';
import BgImg from '../assets/img/daogroni-background.png';

export const defaultTheme = {
  primary500: '#EFEBE6',
  primaryAlpha: rgba('#EFEBE6', 0.9),
  secondary500: '#AB7744',
  secondaryAlpha: rgba('#AB7744', 0.75),
  tertiary500: '#192954',
  tertiaryAlpha: rgba('#192954', 0.75),
  bg500: '#EFEBE6',
  bgAlpha: '#EFEBE6',
  bgOverlayOpacity: 0,
  modeAlpha500: '#FFFFFF',
  headingFont: 'Mulish',
  bodyFont: 'Mulish',
  monoFont: 'Space Mono',
  avatarImg: BrandImg,
  bgImg: BgImg,
  daoMeta: {
    proposals: 'Proposals',
    proposal: 'Proposal',
    bank: 'Bank',
    members: 'Members',
    member: 'Member',
    boosts: 'Apps',
    boost: 'App',
    settings: 'Settings',
    ragequit: 'Rage Quit',
    guildKick: 'Guild Kick',
    minion: 'Minion',
    minions: 'Minions',
  },
};

// halloween
// export const defaultTheme = {
//   primary500: '#4a5443',
//   primaryAlpha: rgba(74, 84, 67, 0.9),
//   secondary500: '#d29100',
//   secondaryAlpha: rgba(210, 145, 0, 0.75),
//   bg500: '#000000',
//   bgAlpha: '#03061B',
//   bgOverlayOpacity: 0.41,
//   modeAlpha500: '#FFFFFF',
//   headingFont: 'Mulish',
//   bodyFont: 'Rubik',
//   monoFont: 'Space Mono',
//   avatarImg: BrandImg,
//   bgImg: 'QmU34AoT8VedXx1DV2FRsSKXmchEqgEYPs7dsdsRre4WUz',
//   daoMeta: {
//     proposals: 'Proposals',
//     proposal: 'Proposal',
//     bank: 'Bank',
//     members: 'Members',
//     member: 'Member',
//     boosts: 'Apps',
//     boost: 'App',
//     settings: 'Settings',
//     ragequit: 'Rage Quit',
//     guildKick: 'Guild Kick',
//     minion: 'Minion',
//     minions: 'Minions',
//   },
// };
