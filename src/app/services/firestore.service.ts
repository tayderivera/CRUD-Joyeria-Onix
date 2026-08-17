import { Injectable } from "@angular/core";
import {doc, addDoc, deleteDoc, collection, getDocs, updateDoc} from "firebase/firestore"
import { db } from "../app.config";

@Injectable({ providedIn: "root"})

export class MovimientoService {
    private ref = collection(db, "movimientos");

    async obtenerMovs(){
        const snapshot = await getDocs(this.ref);
        return snapshot.docs.map(doc => ({
            id: doc.id, ...doc.data()
        }))
    }
    async agregarMov(data: any){
        return await addDoc(this.ref, data);
    }

    async actualizarMov( id: string, data: any){
        const docRef = doc(db, "movimientos", id);
        return await updateDoc(docRef, data);
    }

    async borrarMov(id: string){
        const docRef =  doc(db, "movimientos", id );
        return await deleteDoc(docRef);
    }
}