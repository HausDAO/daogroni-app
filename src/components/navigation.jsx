import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { AiOutlineClose } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { useInjectedProvider } from '../contexts/InjectedProviderContext';
import { useOverlay } from '../contexts/OverlayContext';
import AddressAvatar from './addressAvatar';
import WrongNetworkToolTip from './wrongNetworkToolTip';
import { chainByID, daogroniData } from '../utils/chain';

const NAV_ITEMS = [
  {
    label: 'Menu',
    href: '/',
  },
  {
    label: 'My Cocktails',
    href: '/cocktails',
  },
];

const Navigation = ({ isDao }) => {
  const { isOpen, onToggle } = useDisclosure();
  const { address, requestWallet } = useInjectedProvider();
  const { setHubAccountModal } = useOverlay();

  const { daochain } = daogroniData;
  const daoChainName = chainByID(daochain)?.name;

  const toggleAccountModal = () => {
    setHubAccountModal(prevState => !prevState);
  };

  return (
    <Box>
      <Flex
        bg='primary.500'
        minH='80px'
        p={5}
        align='center'
        borderBottom='1px solid'
        borderColor='secondary.500'
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? (
                <AiOutlineClose w={3} h={3} />
              ) : (
                <GiHamburgerMenu w={5} h={5} />
              )
            }
            variant='ghost'
            aria-label='Toggle Navigation'
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Box textAlign={useBreakpointValue({ base: 'center', md: 'left' })}>
            <Text fontSize='2xl' color='tertiary.500'>
              DAOgroni
            </Text>
            <Text
              fontSize='sm'
              mb={{ base: 8, md: 3 }}
              textTransform='uppercase'
              color='secondary.500'
            >
              by DAOhaus
            </Text>
          </Box>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10} align='center'>
            <DesktopNav />
          </Flex>
        </Flex>

        <Link
          mr={5}
          fontSize='sm'
          href='https://app.daohaus.club/dao/0x64/0xc8e0d7fd13eb3cbc19eb293d0e00b8386cc1b6f2/proposals/149'
        >
          Visit the DAO
        </Link>

        {isDao && <WrongNetworkToolTip />}

        {address ? (
          <Button variant='outline' onClick={toggleAccountModal}>
            <AddressAvatar addr={address} hideCopy />
          </Button>
        ) : (
          <Button variant='outline' onClick={requestWallet}>
            Connect to {daoChainName}
          </Button>
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};

const DesktopNav = () => {
  const linkColor = useColorModeValue('tertiary.600', 'tertiary.200');
  const linkHoverColor = useColorModeValue('tertiary.800', 'tertiary');
  const popoverContentBgColor = useColorModeValue('tertiary', 'tertiary.800');

  return (
    <Stack direction='row' spacing={4}>
      {NAV_ITEMS.map(navItem => (
        <Box key={navItem.label}>
          <Popover trigger='hover' placement='bottom-start'>
            <PopoverTrigger>
              <Link
                p={2}
                as={RouterLink}
                to={navItem.href || '#'}
                fontSize='sm'
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow='xl'
                bg={popoverContentBgColor}
                p={4}
                rounded='xl'
                minW='sm'
              >
                <Stack>
                  {navItem.children.map(child => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      as={RouterLink}
      to={href}
      role='group'
      display='block'
      p={2}
      rounded='md'
      _hover={{ bg: useColorModeValue('secondary.50', 'gray.900') }}
    >
      <Stack direction='row' align='center'>
        <Box>
          <Text
            transition='all .3s ease'
            _groupHover={{ color: 'secondary.400' }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize='sm'>{subLabel}</Text>
        </Box>
        <Flex
          transition='all .3s ease'
          transform='translateX(-10px)'
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify='flex-end'
          align='center'
          flex={1}
        >
          <Icon color='secondary.400' w={5} h={5} as={FaChevronRight} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack bg='primary.500' p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map(navItem => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify='space-between'
        align='center'
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={FaChevronDown}
            transition='all .25s ease-in-out'
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle='solid'
          borderColor={useColorModeValue('white.200', 'white.700')}
          align='start'
        >
          {children &&
            children.map(child => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

export default Navigation;
