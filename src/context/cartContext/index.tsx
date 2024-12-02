import React, { createContext, useState, ReactNode } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  total: number;

  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => { },
  removeFromCart: () => { },
  total: 0,
  wishlistItems: [],
  addToWishlist: () => { },
  removeFromWishlist: () => { },
  isInWishlist: () => false,
});

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prevItems, item];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const addToWishlist = (item: WishlistItem) => {
    if (!wishlistItems.find((i) => i.id === item.id)) {
      setWishlistItems((prevItems) => [...prevItems, item]);
    }
  };

  const removeFromWishlist = (id: number) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const isInWishlist = (id: number) => wishlistItems.some((item) => item.id === id);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        total,
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
