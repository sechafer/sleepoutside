export default class CheckoutProcess {

    constructor (key, outputselecttor){
  
      this.key = key;
      this.outputselecttor = outputselecttor;
      this.list = [];
      this.itemTotal = 0; 
      this.shipping = 0; 
      this.tax = 0; 
      this.ordertotal = 0; 
    }
  
    init(){
      this.list = getLocalStorage(this.key);
      this.calculateItemSummary();
    }
    calculateItemSummary() {
      // calculate and display the total amount of the items in the cart, and the number of items.
       
      const getItems = getLocalStorage("so-cart");
      const itemSummary = document.querySelector(".item_summary");
  
      if(getItems.length > 0){
        const items = getItems.reduce((acc, item) => acc + item.quantity, 0)
        itemSummary.textContent =` Total items: ${items}`;
      }else{ 
        itemSummary.textContent = `Total: 0`
      }
    }
    calculateOrderTotal() {
      const getItems = getLocalStorage("so-cart");
      const orderTotal = document.querySelector(".order_total");
    
      if (getItems.length > 0) {
        const subtotal = getItems.reduce((acc, item) => acc + item.FinalPrice, 0);
    
        const taxRate = 0.06;
        const taxes = subtotal * taxRate;
    
        const shippingCost = 10; 
    
        const total = subtotal + taxes + shippingCost;
    
        orderTotal.textContent = `Order Total: $${total.toFixed(2)}`;
      } else {
        orderTotal.textContent = `Order Total: $0.00`;
      }
    }
  
  }