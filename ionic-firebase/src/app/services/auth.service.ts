import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Cliente } from '../models/cliente.model';
import { FirestoreBaseService } from './firestore-base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth :AngularFireAuth, private fire:FirestoreBaseService) { }

  login(email:string,password:string){
    return this.auth.signInWithEmailAndPassword(email,password);

  }

  logout() {
    return  this.auth.signOut();
  } 

  registrar(email:string,password:string){
    return this.auth.createUserWithEmailAndPassword(email,password);
  }

 async getUID() {
  
  const user = await this.auth.currentUser;
  if (user == null) {
    return null;
  } else {
    return user.uid;
  }
 }

guardarUser(cliente:Cliente){
  const path = 'Clientes';
  // const  name= this.c
  this.fire.createDoc(cliente,path,cliente.uid);
 }
}
