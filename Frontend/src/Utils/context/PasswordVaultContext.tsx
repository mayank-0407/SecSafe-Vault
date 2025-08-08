import React, { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../ethers/constants";
import { encryptText } from "../Helpers/encryption";

type Entry = {
  name: string;
  username: string;
  password: string;
};

type FormData = {
  name: string;
  username: string;
  password: string;
};

type VaultContextType = {
  currentAccount: string;
  connectWallet: () => Promise<void>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  formData: FormData;
  addEntry: () => Promise<void>;
  deleteEntry: (index: number) => Promise<void>;
  entries: Entry[];
  isLoading: boolean;
};

export const PasswordVaultContext = createContext<VaultContextType | null>(
  null
);

const { ethereum } = window as any;

const getEthereumContract = async () => {
  const provider = new ethers.BrowserProvider(ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  return contract;
};

export const PasswordVaultProvider = ({
  children,
}: {
  children:any;
}) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    username: "",
    password: "",
  });
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const addEntry = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const { name, username, password } = formData;

      const encryptedUsername = encryptText(username);
      const encryptedPassword = encryptText(password);
      const contract = await getEthereumContract();
      setIsLoading(true);

      const tx = await contract.addEntry(
        name,
        encryptedUsername,
        encryptedPassword
      );
      await tx.wait();

      setFormData({ name: "", username: "", password: "" });
      loadEntries(); // refresh entries
    } catch (error) {
      console.error("Failed to add entry:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteEntry = async (index: number) => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");
      const contract = await getEthereumContract();
      setIsLoading(true);
      const tx = await contract.deleteEntry(index);
      await tx.wait();
      loadEntries(); // Refresh the list
    } catch (error) {
      console.error("Failed to delete entry:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadEntries = async () => {
    // try {
    const contract = await getEthereumContract();

    const data = await contract.getMyEntries();

    const formatted: Entry[] = data.map((entry: any) => ({
      name: entry[0], // or entry.name, if accessible
      username: entry[1],
      password: entry[2],
    }));
    setEntries(formatted);
    // } catch (error) {
    //   console.error("Error loading entries:", error);
    // }
  };

  const checkIfWalletIsConnected = async () => {
    if (!ethereum) return console.log("MetaMask not installed");

    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length) {
      setCurrentAccount(accounts[0]);
      loadEntries();
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <PasswordVaultContext.Provider
      value={{
        currentAccount,
        connectWallet,
        handleChange,
        formData,
        addEntry,
        deleteEntry,
        entries,
        isLoading,
      }}
    >
      {children}
    </PasswordVaultContext.Provider>
  );
};
