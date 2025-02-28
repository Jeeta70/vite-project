// LinkedList.ts
export class Node {
   data: string;
   next: Node | null;
 
   constructor(data: string) {
     this.data = data;
     this.next = null;
   }
 }
 
 export class LinkedList {
   head: Node | null;
 
   constructor() {
     this.head = null;
   }
 
   // Add a new node at the end
   append(data: string): void {
     const newNode = new Node(data);
     if (!this.head) {
       this.head = newNode;
       return;
     }
 
     let current = this.head;
     while (current.next) {
       current = current.next;
     }
     current.next = newNode;
   }
 
   // Remove the first node with the given data
   remove(data: string): void {
     if (!this.head) return;
 
     if (this.head.data === data) {
       this.head = this.head.next;
       return;
     }
 
     let current = this.head;
     while (current.next && current.next.data !== data) {
       current = current.next;
     }
 
     if (current.next) {
       current.next = current.next.next;
     }
   }
 
   // Convert linked list to an array (for rendering in React)
   toArray(): string[] {
     const elements: string[] = [];
     let current = this.head;
     while (current) {
       elements.push(current.data);
       current = current.next;
     }
     return elements;
   }
 }
 