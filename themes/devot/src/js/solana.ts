import {
    Connection,
    PublicKey,
    Transaction,
    clusterApiUrl,
    SystemProgram,
    LAMPORTS_PER_SOL,
} from "@solana/web3.js";

type DisplayEncoding = "utf8" | "hex";
type PhantomEvent = "disconnect" | "connect" | "accountChanged";
type PhantomRequestMethod =
    | "connect"
    | "disconnect"
    | "signTransaction"
    | "signAllTransactions"
    | "signMessage";

interface ConnectOpts {
    onlyIfTrusted: boolean;
}

interface PhantomProvider {
    publicKey: PublicKey | null;
    isConnected: boolean | null;
    signTransaction: (transaction: Transaction) => Promise<Transaction>;
    signAllTransactions: (
        transactions: Transaction[]
    ) => Promise<Transaction[]>;
    signMessage: (
        message: Uint8Array | string,
        display?: DisplayEncoding
    ) => Promise<any>;
    connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
    disconnect: () => Promise<void>;
    on: (event: PhantomEvent, handler: (args: any) => void) => void;
    request: (method: PhantomRequestMethod, params: any) => Promise<unknown>;
}

let provider: PhantomProvider | undefined;

const connectPhantom = document.getElementById(
    "connect-phantom"
) as HTMLButtonElement;

const anyWindow: any = window;

const getPhantomAccount = async () => {
    try {
        await anyWindow.solana.connect();
    } catch (err) {
        // TODO: Show error message
    }
};

const getProvider = async (): Promise<PhantomProvider | undefined> => {
    if ("solana" in window) {
        const provider = anyWindow.solana;

        if (provider.isPhantom) {
            return provider;
        }
    }

    connectPhantom.disabled = true;
    return;
};

const NETWORK = clusterApiUrl("devnet");

const connection = new Connection(NETWORK);

const createTransferTransaction = async () => {
    const to = new PublicKey("9ZZoqoTfzMvpzeM719AbDnxdTBGaz2UYK77ZCwb5CQDD");

    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: provider.publicKey,
            toPubkey: to,
            lamports: 0.0125 * LAMPORTS_PER_SOL,
        })
    );

    transaction.feePayer = provider.publicKey;
    transaction.recentBlockhash = (
        await connection.getRecentBlockhash()
    ).blockhash;

    return transaction;
};

connectPhantom.addEventListener("click", async () => {
    await getPhantomAccount();

    try {
        const transaction = await createTransferTransaction();

        if (!transaction) {
            return;
        }

        const signed = await provider.signTransaction(transaction);
        const signature = await connection.sendRawTransaction(
            signed.serialize()
        );
        await connection.confirmTransaction(signature);
    } catch (err) {
        // TODO: Show error message
    }
});

window.onload = () => {
    getProvider()
        .then((result) => {
            provider = result;
        })
        .catch(() => {
            // TODO: Show error message
        });
};
