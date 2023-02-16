import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';
import { Producto } from '../models/producto.model';
@Injectable({
  providedIn: 'root',
})
export class FirestoreBaseService {
  constructor(
    private store: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  createDoc(data: any, path: string, id: string) {
    const collection = this.store.collection(path);
    return collection.doc(id).set(data);
  }
  updateDoc(data: any, path: string, id: string) {
    const collection = this.store.collection(path);
    return collection.doc(id).update(data);
  }
  deleteDoc(path: string, id: string) {
    const collection = this.store.collection(path);
    return collection.doc(id).delete();
  }
  getCollection<T>(path: string) {
    const collection = this.store.collection<T>(path);
    return collection.valueChanges();
  }

  getDoc<T>(path: string, id: string) {
    const collection = this.store.collection<T>(path);
    return collection.doc(id).get();
  }


  getID() {
    return this.store.createId();
  }
}
