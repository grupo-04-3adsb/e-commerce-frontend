import React from 'react'
import CardCategoria from '../../Card-categoria'
import '../SectionCategorias/SectionCategorias.modules.css'

const SectionCategorias = () => {
  return (
    <div className="main">
        <div className="categories">
            <div className="etiqueta">
                <p>CATEGORIAS</p>
            </div>
            <div className="categorias">
                <CardCategoria categoryName="TOPO DE BOLO" />
                <CardCategoria categoryName="CADERNO" />
                <CardCategoria categoryName="PERSONALIZADO" />
                <CardCategoria categoryName="AGENDAS" />
                <CardCategoria categoryName="PIRIRIPORORÓ" />
                <CardCategoria categoryName="CURINTIA" />
            </div>
        </div>
    </div>
  )
}

export default SectionCategorias