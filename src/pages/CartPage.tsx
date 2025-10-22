import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../components/ui/alert-dialog";
import { ShoppingCart, Trash2, Plus, Minus, Crown } from "lucide-react";
import { currentUser, memberships } from "../data/mockData";
import { Badge } from "../components/ui/badge";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  type: 'item' | 'food';
}

interface CartPageProps {
  cart: CartItem[];
  addToCart?: (item: { id: number; name: string; price: number; type: 'item' | 'food' }) => void;
  removeFromCart: (id: number, type: 'item' | 'food') => void;
  updateCartQuantity: (id: number, type: 'item' | 'food', quantity: number) => void;
  clearCart: () => void;
  onNavigate?: (page: 'shop') => void;
}

export function CartPage({ cart, removeFromCart, updateCartQuantity, clearCart, onNavigate }: CartPageProps) {
  const [itemToRemove, setItemToRemove] = useState<{ id: number; type: 'item' | 'food'; name: string } | null>(null);
  const [showClearDialog, setShowClearDialog] = useState(false);

  // Check if current user has an active membership
  const hasMembership = currentUser && 'Customer_ID' in currentUser && 
    memberships.some(m => m.Customer_ID === currentUser.Customer_ID && m.Membership_Status);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Apply 10% member discount to items and food (not tickets or memberships)
  const memberDiscount = hasMembership 
    ? cart.filter(item => item.id < 9000).reduce((sum, item) => sum + (item.price * item.quantity * 0.10), 0)
    : 0;
  
  const discountedSubtotal = subtotal - memberDiscount;
  const tax = discountedSubtotal * 0.08;
  const total = discountedSubtotal + tax;

  const handleIncreaseQuantity = (item: CartItem) => {
    updateCartQuantity(item.id, item.type, item.quantity + 1);
  };

  const handleDecreaseQuantity = (item: CartItem) => {
    if (item.quantity > 1) {
      updateCartQuantity(item.id, item.type, item.quantity - 1);
    } else {
      setItemToRemove({ id: item.id, type: item.type, name: item.name });
    }
  };

  const handleRemoveItem = (item: CartItem) => {
    setItemToRemove({ id: item.id, type: item.type, name: item.name });
  };

  const confirmRemove = () => {
    if (itemToRemove) {
      removeFromCart(itemToRemove.id, itemToRemove.type);
      setItemToRemove(null);
    }
  };

  const confirmClearCart = () => {
    clearCart();
    setShowClearDialog(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-emerald-700 text-white py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl mb-4">Shopping Cart</h1>
          <p className="text-xl text-green-100">
            Review your items and proceed to checkout
          </p>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Cart Items ({cart.length})</CardTitle>
                    {cart.length > 0 && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowClearDialog(true)}
                        className="text-red-600 border-red-600 hover:bg-red-50 cursor-pointer"
                      >
                        Clear Cart
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {cart.length > 0 ? (
                    <div className="space-y-4">
                      {cart.map((item) => {
                        // Safety check for undefined values
                        if (!item || item.price === undefined || item.quantity === undefined) {
                          return null;
                        }
                        
                        return (
                        <div 
                          key={`${item.type}-${item.id}`}
                          className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-200"
                        >
                          <div className="flex-1">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-600">
                              ${item.price.toFixed(2)} each
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {item.type === 'item' ? 'Gift Shop Item' : 'Food Item'}
                            </p>
                          </div>
                          <div className="flex items-center space-x-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-300 px-2 py-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDecreaseQuantity(item)}
                                className="h-6 w-6 p-0 cursor-pointer"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleIncreaseQuantity(item)}
                                className="h-6 w-6 p-0 cursor-pointer"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            {/* Price */}
                            <span className="text-lg text-green-600 font-semibold min-w-[80px] text-right">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                            
                            {/* Delete Button */}
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleRemoveItem(item)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )})}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Your cart is empty</p>
                      <Button className="bg-green-600 hover:bg-green-700 cursor-pointer" onClick={() => onNavigate?.('shop')}>
                        Continue Shopping
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    
                    {hasMembership && memberDiscount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <div className="flex items-center gap-2">
                          <Crown className="h-4 w-4" />
                          <span>Member Discount (10%):</span>
                        </div>
                        <span>-${memberDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-gray-700">
                      <span>Tax (8%):</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                      <span>Total:</span>
                      <span className="text-green-600">${total.toFixed(2)}</span>
                    </div>

                    {hasMembership && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-2">
                        <div className="flex items-center gap-2 text-green-700 text-sm">
                          <Crown className="h-4 w-4" />
                          <span>Member discount applied!</span>
                        </div>
                      </div>
                    )}

                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700 mt-6 cursor-pointer"
                      disabled={cart.length === 0}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Remove Item Confirmation Dialog */}
      <AlertDialog open={itemToRemove !== null} onOpenChange={() => setItemToRemove(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Item?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{itemToRemove?.name}" from your cart?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmRemove}
              className="bg-red-600 hover:bg-red-700 cursor-pointer"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Clear Cart Confirmation Dialog */}
      <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear Cart?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete all items from your cart? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmClearCart}
              className="bg-red-600 hover:bg-red-700 cursor-pointer"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cart
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}