/**
 * DataContext - Shared state management for Wildwood Zoo system
 * 
 * This context provides centralized data management for:
 * - Animals: All zoo animals across 8 habitats
 * - Gift Shop Items: All items available in the gift shop
 * - Concession Items: All food/beverage items across 4 concession stands
 * - Purchases: All customer purchases (tickets, items, food, memberships)
 * - Memberships: Customer membership status and renewals
 * 
 * All additions, updates, and deletions are automatically reflected
 * across all pages and portals in real-time.
 */

import { createContext, useContext, useState, ReactNode } from 'react';
import { 
  animals as initialAnimals, 
  items as initialItems, 
  concessionItems as initialConcessionItems,
  purchases as initialPurchases,
  tickets as initialTickets,
  purchaseItems as initialPurchaseItems,
  purchaseConcessionItems as initialPurchaseConcessionItems,
  memberships as initialMemberships,
  type Animal,
  type Item,
  type ConcessionItem,
  type Purchase,
  type Ticket,
  type PurchaseItem,
  type PurchaseConcessionItem,
  type Membership
} from './mockData';

interface DataContextType {
  animals: Animal[];
  addAnimal: (animal: Animal) => void;
  updateAnimal: (animalId: number, updates: Partial<Animal>) => void;
  deleteAnimal: (animalId: number) => void;
  
  items: Item[];
  addItem: (item: Item) => void;
  updateItem: (itemId: number, updates: Partial<Item>) => void;
  deleteItem: (itemId: number) => void;
  
  concessionItems: ConcessionItem[];
  addConcessionItem: (item: ConcessionItem) => void;
  updateConcessionItem: (itemId: number, updates: Partial<ConcessionItem>) => void;
  deleteConcessionItem: (itemId: number) => void;
  
  purchases: Purchase[];
  addPurchase: (purchase: Purchase) => void;
  
  tickets: Ticket[];
  addTicket: (ticket: Ticket) => void;
  
  purchaseItems: PurchaseItem[];
  addPurchaseItem: (purchaseItem: PurchaseItem) => void;
  
  purchaseConcessionItems: PurchaseConcessionItem[];
  addPurchaseConcessionItem: (purchaseConcessionItem: PurchaseConcessionItem) => void;
  
  memberships: Membership[];
  addMembership: (membership: Membership) => void;
  updateMembership: (customerId: number, updates: Partial<Membership>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [animals, setAnimals] = useState<Animal[]>(initialAnimals);
  const [items, setItems] = useState<Item[]>(initialItems);
  const [concessionItems, setConcessionItems] = useState<ConcessionItem[]>(initialConcessionItems);
  const [purchases, setPurchases] = useState<Purchase[]>(initialPurchases);
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [purchaseItems, setPurchaseItems] = useState<PurchaseItem[]>(initialPurchaseItems);
  const [purchaseConcessionItems, setPurchaseConcessionItems] = useState<PurchaseConcessionItem[]>(initialPurchaseConcessionItems);
  const [memberships, setMemberships] = useState<Membership[]>(initialMemberships);

  // Animal operations
  const addAnimal = (animal: Animal) => {
    setAnimals(prev => [...prev, animal]);
  };

  const updateAnimal = (animalId: number, updates: Partial<Animal>) => {
    setAnimals(prev => prev.map(animal => 
      animal.Animal_ID === animalId ? { ...animal, ...updates } : animal
    ));
  };

  const deleteAnimal = (animalId: number) => {
    setAnimals(prev => prev.filter(animal => animal.Animal_ID !== animalId));
  };

  // Item operations
  const addItem = (item: Item) => {
    setItems(prev => [...prev, item]);
  };

  const updateItem = (itemId: number, updates: Partial<Item>) => {
    setItems(prev => prev.map(item => 
      item.Item_ID === itemId ? { ...item, ...updates } : item
    ));
  };

  const deleteItem = (itemId: number) => {
    setItems(prev => prev.filter(item => item.Item_ID !== itemId));
  };

  // Concession item operations
  const addConcessionItem = (item: ConcessionItem) => {
    setConcessionItems(prev => [...prev, item]);
  };

  const updateConcessionItem = (itemId: number, updates: Partial<ConcessionItem>) => {
    setConcessionItems(prev => prev.map(item => 
      item.Concession_Item_ID === itemId ? { ...item, ...updates } : item
    ));
  };

  const deleteConcessionItem = (itemId: number) => {
    setConcessionItems(prev => prev.filter(item => item.Concession_Item_ID !== itemId));
  };

  // Purchase operations
  const addPurchase = (purchase: Purchase) => {
    setPurchases(prev => [...prev, purchase]);
  };

  // Ticket operations
  const addTicket = (ticket: Ticket) => {
    setTickets(prev => [...prev, ticket]);
  };

  // Purchase item operations
  const addPurchaseItem = (purchaseItem: PurchaseItem) => {
    setPurchaseItems(prev => [...prev, purchaseItem]);
  };

  // Purchase concession item operations
  const addPurchaseConcessionItem = (purchaseConcessionItem: PurchaseConcessionItem) => {
    setPurchaseConcessionItems(prev => [...prev, purchaseConcessionItem]);
  };

  // Membership operations
  const addMembership = (membership: Membership) => {
    setMemberships(prev => [...prev, membership]);
  };

  const updateMembership = (customerId: number, updates: Partial<Membership>) => {
    setMemberships(prev => prev.map(membership => 
      membership.Customer_ID === customerId ? { ...membership, ...updates } : membership
    ));
  };

  return (
    <DataContext.Provider value={{
      animals,
      addAnimal,
      updateAnimal,
      deleteAnimal,
      items,
      addItem,
      updateItem,
      deleteItem,
      concessionItems,
      addConcessionItem,
      updateConcessionItem,
      deleteConcessionItem,
      purchases,
      addPurchase,
      tickets,
      addTicket,
      purchaseItems,
      addPurchaseItem,
      purchaseConcessionItems,
      addPurchaseConcessionItem,
      memberships,
      addMembership,
      updateMembership
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
