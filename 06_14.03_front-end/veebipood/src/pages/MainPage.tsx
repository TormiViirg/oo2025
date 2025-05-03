import { useCallback, useEffect, useRef, useState } from 'react'
import { Category } from '../models/Category';
import { Product } from '../models/Product';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// reacti erikood, vajab importi, use eesliidesega algama, funktionaalne vajab seetõttu () lõppu,
function MainPage() {
  const { t } = useTranslation();
  const [kategooriad, setKategooriad] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [productsByPage, setProductsByPage] = useState(1);// usestate vajalik selle muutmiseks nt dropdown valik, tahame et f käivituks selle muutusel
  const [page, setPage] = useState(0);
  const [activeCategory, setActiveCategory] = useState(-1);// let page = 0; kui muudaks hiljem koodis page = 1 siis ei laäheks html uuendama
  const productsByPageRef = useRef<HTMLSelectElement>(null); //seob html input/selectiga, // .current? mitu väärtust võib nüüd olla //.current.value toob stringi kuskilt mis millegile vastab ja Number() teeb numbriks tagasi
  const [sort, setSort] = useState("id,asc");

  useEffect(() => {
    fetch("http://localhost:8080/categories")
    .then(res=>res.json())
    .then(json => setKategooriad(json))
  }, []);//[]siis käivitub uuesti

  const showByCategory = useCallback((categoryId: number, currentPage: number) => {
    setActiveCategory(categoryId);
    setPage(currentPage);
    console.log(currentPage);
    fetch("http://localhost:8080/category-products?categoryId=" + categoryId +
      "&size=" + productsByPage +
      "&page" + currentPage + 
      "&sort" + sort
    )
    .then(res=>res.json())
    .then(json => {
      setProducts(json.content);
      setTotalProducts(json.totalElements);
      setTotalPages(json.totalPages);
    })
  }, [productsByPage, sort])

  useEffect(() => {
    showByCategory(activeCategory, 0)
  }, [showByCategory, activeCategory]);

  function updatePage(newPage: number) {
    showByCategory(activeCategory, newPage);
  }
  // //=> allpool ainult saab f kasutada
  // const showByCategory = () => {}

  return (
    <div> 
      <button onClick = {() => setSort("id, asc")}> Sorteeri vanemad enne </button>
      <button onClick = {() => setSort("id, desc")}> Sorteeri uuemad enne </button>
      <button onClick = {() => setSort("name, asc")}> Sorteeri A-Z </button>
      <button onClick = {() => setSort("name, desc")}> Sorteeri Z-A </button>
      <button onClick = {() => setSort("price, asc")}> Sorteeri odavamad enne </button>
      <button onClick = {() => setSort("price, desc")}> Sorteeri kallimad enne </button>

      <select ref = {productsByPageRef} 
        onChange = {() => setProductsByPage(Number(productsByPageRef.current?.value))}>

        <option>1</option>
        <option>2</option>
        <option>3</option>

      </select>

      <button onClick={() => showByCategory(-1, 0)}> {t("home.all-categories")} </button>
        {kategooriad.map(kategooria =>
        <button key = {kategooria.id} onClick={() => showByCategory(kategooria.id, 0)}>
          {kategooria.name}
        </button>
      )}

      <br />
      <br />

      <div>Kokku tooteid: {totalProducts} tk</div>

    {products.map(product =>
      <div key={product.id}>
        <div>{product.id}</div>
        <div>{product.name}</div>
        <div>{product.price}</div>
        <div>{product.image}</div>
        <div>{product.category?.name}</div>

        <Link to = {"/product/" + product.id}>
          <button> Vaata lähemalt </button>
        </Link>
      </div>
    )}
    <button disabled={page === 0} onClick={() => updatePage(page - 1)}> Eelmine </button>
      <span>{page + 1}</span>
      <button disabled = {page >= totalPages - 1}
        onClick={() => updatePage(page + 1)}> Järgmine </button>
    </div>
  )
}

export default MainPage