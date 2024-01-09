import React, { createContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';

type CartProductProps = {
  id: string,
  title: string,
  price: number,
};

const CartContext = createContext({
  products: [],
  total: 0,
});

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState([]);
  const [drawer, setDrawer] = useState(false);

  const storageSave = (data) => {
    localStorage.setItem('cart-items', JSON.stringify(data));
  };

  const totalUpdate = () => {
    setTotal(items.reduce((total, o) => {
      return total + (o.product.price * o.quantity);
    }, 0));
  };

  const itemFind = (product) => {
    return items.find(o => o.product.id == product.id);
  };

  const itemUpdate = (item) => {
    const itemsNew = items.map((currentItem) => {
      if (currentItem.product.id != item.product.id) return currentItem;
      item.quantity = parseInt(item.quantity);
      return item;
    });

    setItems(itemsNew);
    storageSave(itemsNew);
    totalUpdate();
  };

  const itemAdd = (product, quantity=1) => {
    if (!itemFind(product)) {
      items.push({ quantity: 0, product });
    }

    const itemsNew = items.map(item => {
      if (item.product.id != product.id) return item;
      item.quantity += quantity;
      return item;
    });

    setItems(itemsNew);
    storageSave(itemsNew);
    totalUpdate();
  };

  const itemRemove = async (product) => {
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
      totalUpdate();
    }
  };

  const itemsClear = () => {
    setItems([]);
    storageSave([]);
    totalUpdate();
  };

  const drawerToggle = () => {
    setDrawer(!drawer);
  };

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem('cart-items') || '[]'));
  }, []);

  return (
    <CartContext.Provider value={{
      total,
      setTotal,
      totalUpdate,
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