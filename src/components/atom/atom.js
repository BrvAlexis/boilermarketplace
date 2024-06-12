import { atom } from "jotai";
import { atomWithStorage } from 'jotai/utils'

export const userAtom = atomWithStorage(
  "user",
  {
  email: "",
  id: "",
  isLoggedIn: false,
});

export const searchAtom = atom({})

export const productsAtom = atom([])