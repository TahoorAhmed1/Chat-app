import { Message } from "@/typings";
import { create } from "zustand";

interface ChatStoreInterface {
  inputValue: string;
  setInputValue: (inputValue: string) => void;
  clearInput: () => void;
}

export const useChatStore = create<ChatStoreInterface>()((set) => ({
  inputValue: "",
  setInputValue: (inputValue: string) => set({ inputValue: inputValue }),
  clearInput: async () => {
    set({ inputValue: "" });
  },
}));
