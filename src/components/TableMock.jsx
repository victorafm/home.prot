import React from "react";

export default function TableMock({ title }) {
  // simple placeholder table
  const rows = new Array(8).fill(0).map((_,i) => ({
    id: i+1,
    nome: `Item ${i+1}`,
    descricao: "Descrição exemplo",
    status: i % 2 === 0 ? "Ativo" : "Pendente"
  }));

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">{title}</h3>
        <div className="text-sm text-gray-500">Exemplo</div>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="text-sm text-gray-600 border-b">
            <th className="py-2">#</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id} className="border-b hover:bg-neutralBg">
              <td className="py-2">{r.id}</td>
              <td>{r.nome}</td>
              <td>{r.descricao}</td>
              <td>{r.status}</td>
            </tr> 
          ))}
        </tbody>
      </table>
    </div>
  );
}
