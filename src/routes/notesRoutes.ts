import express from "express";
import Note from "../models/noteModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const notes = await Note.find();

        res.status(200).json(notes);
    }
    catch(error) {
        console.log("Error al obtener las notas: ", error);
        res.status(500).json({error: "Internal error server"});
    }
})

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const note = await Note.findById(id);

        if(!note) {
            return res.status(404).json({ error: "Nota no encontrada" });
        }

        res.status(200).json(note);
    }
    catch(error) {
        console.log("Error al traer la nota: ", error);
        res.status(500).json({ error: "Internal error server" });
    }
})

router.post("/", async (req, res) => {
    try {
        const { title, description } = req.body;
    
        const note = new Note({ title, description })

        const savedNota = await note.save();

        if(savedNota) {
            res.status(200).json({ message: "Nota creada correctamente", note: savedNota });
        }
    }
    catch(error) {
        console.log("Error al crear la cuenta: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const deletedNote = await Note.findByIdAndDelete(id);

        if(!deletedNote) {
            return res.status(404).json({ message: "Nota no eliminada" });
        }
        
        res.status(200).json({ message: "Nota eliminada correctamente" });
    }
    catch(error) {
        console.log("Error al eliminar la nota");
        res.status(500).json({ error: "Internal server error" });
    }
})

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const { title, description } = req.body;

        const updatedNote = await Note.findByIdAndUpdate(id, { title, description }, { new: true });

        if(!updatedNote) {
            return res.status(404).json({ message: "No se pudo actualizar la nota" });
        }

        res.status(200).json({ message: "Nota actualizada correctamente", note: updatedNote });
    }
    catch(error) {
        console.log("Error al actualizar");
        res.status(500).json({ error: "Internal server error" });
    }
})

export default router;