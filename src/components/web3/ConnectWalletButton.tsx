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
    // <div
    //   className="bg-[#3b7d4a] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#72b01d] transition-colors"
    // >
      <>
       <Wallet>
            <ConnectWallet >
              <Avatar />
              <Name />
            </ConnectWallet>
            <WalletDropdown >
              <Identity
                // className="px-4 pt-3 pb-2"
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
    {/* <Wallet>
      <ConnectWallet />
      <WalletDropdown>
        <WalletAdvancedWalletActions />
        <WalletAdvancedAddressDetails />
        <WalletAdvancedTransactionActions />
        <WalletAdvancedTokenHoldings />
      </WalletDropdown>
    </Wallet> */}
    </>
  );
};

export default ConnectWalletButton;
