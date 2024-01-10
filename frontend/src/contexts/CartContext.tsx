import React, { createContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export interface ProductInterface {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
}

export interface CartItemInterface {
  quantity: number;
  product: ProductInterface;
};

export interface CartInterface {
  drawer: boolean | null;
  items: CartItemInterface[];
  total: number;
  drawerToggle: (value?: boolean) => void;
  setTotal: (value: number) => void;
  setItems: (value: CartItemInterface[]) => void;
  itemFind: (product: ProductInterface) => CartItemInterface | undefined;
  itemUpdate: (product: CartItemInterface) => void;
  itemAdd: (product: ProductInterface, quantity?: number) => void;
  itemRemove: (product: ProductInterface) => void;
  itemsClear: () => void;
};

const CartContext = createContext<CartInterface>({
  drawer: false,
  items: [],
  total: 0,
  drawerToggle: (value = false) => null,
  setTotal: (value: number) => null,
  setItems: (value: CartItemInterface[]) => null,
  itemFind: (product: ProductInterface) => undefined,
  itemUpdate: (product: CartItemInterface) => null,
  itemAdd: (product: ProductInterface, quantity?: number) => null,
  itemRemove: (product: ProductInterface) => null,
  itemsClear: () => null,
});

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [total, setTotal] = useState<number>(0);
  const [items, setItems] = useState<CartItemInterface[]>([]);
  const [drawer, setDrawer] = useState<boolean | null>(null);

  const storageSave = (data: any[]) => {
    localStorage.setItem('cart-items', JSON.stringify(data));
  };

  const totalUpdate = (items: CartItemInterface[] = []) => {
    setTotal(items.reduce((total, o: CartItemInterface) => {
      return total + (o.product.price * o.quantity);
    }, 0));
  };

  const itemFind = (product: ProductInterface) => {
    return items.find((o: CartItemInterface) => {
      return o.product.id == product.id;
    });
  };

  const itemUpdate = (item: CartItemInterface) => {
    const itemsNew = items.map((currentItem: CartItemInterface) => {
      if (currentItem.product.id != item.product.id) return currentItem;
      item.quantity = +item.quantity;
      return item;
    });

    setItems(itemsNew);
    storageSave(itemsNew);
    totalUpdate(itemsNew);
  };

  const itemAdd = (product: ProductInterface, quantity: number = 1) => {
    if (!itemFind(product)) {
      items.unshift({ quantity: 0, product });
    }

    const itemsNew: CartItemInterface[] = items.map((item: CartItemInterface) => {
      if (item.product.id != product.id) return item;
      item.quantity += quantity;
      return item;
    });

    setItems(itemsNew);
    storageSave(itemsNew);
    totalUpdate(itemsNew);
    setDrawer(true);
  };

  const itemRemove = async (product: ProductInterface) => {
    const resp = await Swal.fire({
      icon: "warning",
      html: `Confirmar remoção de <strong>${product.title}</strong>?`,
      confirmButtonText: 'Remover',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'font-bold mx-1 py-2 px-4 rounded text-white bg-red-500 hover:bg-red-700',
        cancelButton:  'font-bold mx-1 py-2 px-4 rounded bg-gray-200 hover:bg-gray-300',
      },
    });

    
    if (resp.isConfirmed) {
      const itemsNew = [...items.filter(o => o.product.id != product.id)];
      setItems(itemsNew);
      storageSave(itemsNew);
      totalUpdate(itemsNew);
    }
  };

  const itemsClear = () => {
    setItems([]);
    storageSave([]);
    totalUpdate([]);
  };

  const drawerToggle = (value: boolean | null = null) => {
    setDrawer(value===null ? !drawer : value);
  };

  useEffect(() => {
    const itemsNew = JSON.parse(localStorage.getItem('cart-items') || '[]');
    setItems(itemsNew);
    totalUpdate(itemsNew);
  }, []);

  return (
    <CartContext.Provider value={{
      total,
      setTotal,
      items,
      setItems,
      itemFind,
      itemUpdate,
      itemAdd,
      itemRemove,
      itemsClear,
      drawer,
      drawerToggle,
    }}>
      {children}
    </CartContext.Provider>
  );
};


export { CartContext, CartProvider };