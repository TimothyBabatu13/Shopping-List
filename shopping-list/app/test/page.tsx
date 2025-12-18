"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

export default function Notes() {
  const [notes, setNotes] = useState([
    { id: 1, text: "First note" },
    { id: 2, text: "Second note" },
  ])

  const deleteNote = (id: number) => {
    setNotes(notes.filter(n => n.id !== id))
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {notes.map(note => (
          <motion.div
            key={note.id}
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.25 }}
            className="p-4 border rounded-md"
          >
            <div className="flex justify-between items-center">
              <p>{note.text}</p>
              <button
                className="text-red-500"
                onClick={() => deleteNote(note.id)}
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
