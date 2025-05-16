import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownBasename, 
  WalletDropdownFundLink, 
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import {
  Avatar,
  Identity,
  Name,
  Address,
  EthBalance,
} from '@coinbase/onchainkit/identity';
// import {
//   ConnectWallet,
//   Wallet,
//   WalletDropdown,
//   WalletAdvancedAddressDetails,
//   WalletAdvancedTokenHoldings,
//   WalletAdvancedTransactionActions,
//   WalletAdvancedWalletActions,
// } from '@coinbase/onchainkit/wallet';



const ConnectWalletButton = () => {
  return (
      <>
       <Wallet>
            <ConnectWallet>
              <Avatar className="h-6 w-6" />
              <Name />
            </ConnectWallet>
            <WalletDropdown>
              <Identity
                hasCopyAddressOnClick
              >
                <Avatar />
                <Name />
                <Address />
                <EthBalance />
              </Identity>
              <WalletDropdownBasename />
              <WalletDropdownLink
                icon="wallet"
                href="https://keys.coinbase.com"
              >
                Wallet
              </WalletDropdownLink>
              <WalletDropdownFundLink />
              <WalletDropdownDisconnect />
            </WalletDropdown>
          </Wallet>
    </>
  );
};

export default ConnectWalletButton;
