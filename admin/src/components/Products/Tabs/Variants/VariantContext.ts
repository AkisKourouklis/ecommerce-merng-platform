import { createContext } from "react";

export const VariantContext = createContext<unknown>({ images: [], setImages: () => void 0 });
