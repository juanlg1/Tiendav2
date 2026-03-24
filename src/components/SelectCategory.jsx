import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'

const SelectCategory = ({ setSort, sort }) => {
  return (
    <Select value={sort === 'title' ? 'title' : sort === 'asc' ? 'asc' : 'desc'} onValueChange={setSort}>
      <SelectTrigger className="w-full bg-slate-50 border-slate-200 rounded-xl shadow-sm focus:ring-slate-900 h-10">
        <SelectValue placeholder="Ordenar por:" />
      </SelectTrigger>
      <SelectContent className="rounded-xl shadow-lg border-slate-200">
        <SelectGroup>
          <SelectItem value="asc" className="cursor-pointer font-medium p-3">Precio: Menor a Mayor</SelectItem>
          <SelectItem value="desc" className="cursor-pointer font-medium p-3">Precio: Mayor a Menor</SelectItem>
          <SelectItem value="title" className="cursor-pointer font-medium p-3">Titulo: A-Z</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectCategory