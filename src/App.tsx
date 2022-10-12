import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider, useAnchorWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import {  PhantomWalletAdapter,  SolflareWalletAdapter, } from '@solana/wallet-adapter-wallets';
import { Program, web3, BN, Provider, AnchorProvider, } from '@project-serum/anchor';
import { clusterApiUrl, Connection } from '@solana/web3.js';
import React, { FC, ReactNode, useMemo, useEffect, useRef, useState } from 'react';
import idl from './idl.json'
import Signup from './components/Signup';
import NewStatus from './components/NewStatus';
import NewUsername from './components/NewUsername';
import { program } from '@project-serum/anchor/dist/cjs/spl/associated-token';
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import * as anchor from "@project-serum/anchor";
import * as buffer from "buffer";
import { userInfo } from 'os';
window.Buffer = buffer.Buffer;


require('./App.css');
require('@solana/wallet-adapter-react-ui/styles.css');

const App: FC = () => {
    return (
        <Context>
            <Content />
        </Context>
    );
};
export default App;

const Context: FC<{ children: ReactNode }> = ({ children }) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
        ],
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

const Content: FC = () => {
    const wallet = useAnchorWallet();
    const baseAccount = web3.Keypair.generate();
    let [isAccount, setIsAccount] = useState(false);

    function getProvider() {

        if (!wallet) {
            return null;
        }
        const network = "http://127.0.0.1:8899";
        const connection = new Connection(network, "processed");
    
        const provider = new AnchorProvider(
            connection, wallet, {"preflightCommitment": "processed"},
        );
        return provider;
    }

    async function NewUser(username: string) {
    const provider = getProvider()
    
    if (!provider) {
            throw("Provider is null!!!");
        }
    
    const a = JSON.stringify(idl);
    const b = JSON.parse(a);
    const program = new Program(b, idl.metadata.address, provider);
    const publicKey = provider.wallet.publicKey;
    const [newUserPDA] = await anchor.web3.PublicKey.findProgramAddress([
      utf8.encode('new_user_account'),
      publicKey.toBuffer(),
    ],
    program.programId
    );
    
    console.log("newUserPDA", newUserPDA);
    await program.methods.newUser(username, "Hi I'm new here").accounts({
      userAccount: newUserPDA,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .rpc();
    const newUserAccount = await program.account.user.fetch(newUserPDA);
    setIsAccount(true);
     console.log(newUserAccount);
}

   
    async function UpdateUsername(username: string) {
        const provider = getProvider()
        
        if (!provider) {
                throw("Provider is null!!!");
            }
        
        const a = JSON.stringify(idl);
        const b = JSON.parse(a);
        const program = new Program(b, idl.metadata.address, provider);
        const publicKey = provider.wallet.publicKey;
        const [newUserPDA] = await anchor.web3.PublicKey.findProgramAddress([
          utf8.encode('new_user_account'),
          publicKey.toBuffer(),
        ],
        program.programId
        );
        
        console.log("newUserPDA", newUserPDA);
        await program.methods.updateUsername(username).accounts({
          userAccount: newUserPDA,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();
        const newUserAccount = await program.account.user.fetch(newUserPDA);
        setIsAccount(true);
        console.log(newUserAccount); 
         
    }

    async function UpdateStatus(status: string) {
        const provider = getProvider()
            
        if (!provider) {
            throw("Provider is null!!!");
            }
            
        const a = JSON.stringify(idl);
        const b = JSON.parse(a);
        const program = new Program(b, idl.metadata.address, provider);
        const publicKey = provider.wallet.publicKey;
        const [newUserPDA] = await anchor.web3.PublicKey.findProgramAddress([
            utf8.encode('new_user_account'),
            publicKey.toBuffer(),
        ],
        program.programId
        );
            
        console.log("newUserPDA", newUserPDA);
        
        await program.methods.updateStatus(status).accounts({
            userAccount: newUserPDA,
            systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();
        const newUserAccount = await program.account.user.fetch(newUserPDA);
        console.log(newUserAccount);  
    }
    // console.log(isAccount);
    if (!isAccount) {
        return (
            <div style={{background: "#222222"}} className="App">
                <div>
                <Signup signupUsername={NewUser} />
                <NewUsername updateUsername={UpdateUsername} />

                <WalletMultiButton />
                </div>
            </div>
        );
    }; 
    return (
        <div style={{background: "#222222"}} className="App">
            <div style={{}}>
                {/* <Signup signupUsername={NewUser} /> */}
                <NewUsername updateUsername={UpdateUsername} />
                <NewStatus updateStatus={UpdateStatus} />
                {/* <NewUsername updateUsername={UpdateUsername} /> */}
                <WalletMultiButton />
            </div>
        </div>
    );   
};



 // const provider = getProvider()
        // if (!provider) {
        //     throw("Provider is null!!!");
        // }
    
        // const a = JSON.stringify(idl);
        // const b = JSON.parse(a);
        // const program = new Program(b, idl.metadata.address, provider);
        
        //     await program.methods.newUser("new user", "just joined sol social").accounts({
        //         userAccount: baseAccount.publicKey,
        //         systemProgram: web3.SystemProgram.programId,
        //     })
        //     .rpc();
        //     const newAccount = await program.account.userAccount.fetch(baseAccount.publicKey);
        //     console.log('account: ', newAccount);
       
       
        {/* <button onClick={NewUser}>New User</button> */}
            {/* <button onClick={UpdateUsername}>Update Username</button> */}
            {/* <button onClick={UpdateStatus}>Update Status</button> */}