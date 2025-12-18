"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

export default function FancyAdd() {
  const [items, setItems] = useState<string[]>(['Item'])

  const addItem = () => {
    setItems(prev => [...prev, `Item ${prev.length + 1}`])
  }

  return (
    <div className="space-y-4">
      <button
        onClick={addItem}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Add Item
      </button>

      <AnimatePresence>
        {items.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="p-3 rounded border"
          >
            {item}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
