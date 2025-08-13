import React, { useEffect } from "react";
import "../css/CmsPage.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addBrand, deleteBrand, fetchBrands } from "../redux/brandsReducer";
import { addCategory, fetchCategories, deleteCategory } from "../redux/categoriesReducer";
import { fetchProducts, deleteProduct, addProduct } from "../redux/productReducer";

export const CmsPage = () => {
    const dispatch = useDispatch();
    
    // ДОБАВЛЕНИЕ НОВОГО БРЕНДА
    // ДОБАВЛЕНИЕ НОВОГО БРЕНДА
    // ДОБАВЛЕНИЕ НОВОГО БРЕНДА
    useEffect(() => {
        dispatch(fetchBrands());
    }, [dispatch]);
    const brands = useSelector(state => state.brands.brands);
    const [brandName, setBrandName] = useState("");
    const [brandSlug, setBrandSlug] = useState("");
    const [message, setMessage] = useState("");

    const handleAddBrand = async (e) => {
        e.preventDefault();

        if (!brandName.trim() || !brandSlug.trim()) {
            setMessage("Пожалуйста, заполните все поля");
            return;
        }

        const checking = brands.find(item => item.name === brandName);
        const lastItem = brands.length > 0 ? brands[brands.length - 1] : { id: '0' };

        if (checking === undefined) {
            await dispatch(addBrand(Number(lastItem.id) + 1, brandName, brandSlug));
            setMessage(`Успешно добавлено. Id нового элемента: ${Number(lastItem.id) + 1}`);
        } else {
            setMessage(`Такой бренд уже есть в базе данных. Его id: ${checking.id}`);
        }
    };

    // ДОБАВЛЕНИЕ НОВОЙ КАТЕГОРИИ
    // ДОБАВЛЕНИЕ НОВОЙ КАТЕГОРИИ
    // ДОБАВЛЕНИЕ НОВОЙ КАТЕГОРИИ
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);
    const categories = useSelector(state => state.categories.categories);
    const [categoryName, setCategoryName] = useState("");
    const [categorySlug, setCategorySlug] = useState("");
    const [message1, setMessage1] = useState("");

    const handleAddCategory = async (e) => {
        e.preventDefault();

        if (!categoryName.trim() || !categorySlug.trim()) {
            setMessage1("Пожалуйста, заполните все поля");
            return;
        }

        const checking = categories.find(item => item.name === categoryName);
        const lastItem = categories.length > 0 ? categories[categories.length - 1] : { id: '0' };

        if (checking === undefined) {
            await dispatch(addCategory(Number(lastItem.id) + 1, categoryName, categorySlug, 0));
            setMessage1(`Успешно добавлено. Id новой категори: ${Number(lastItem.id) + 1}`);
        } else {
            setMessage1(`Такая категория уже есть в базе данных. Его id: ${checking.id}`);
        }
    };

    const [message2, setMessage2] = useState("");


    const handleDeleteCategory = (item) => async (e) => {
        e.preventDefault();
        await dispatch(deleteCategory(item));
        await dispatch(fetchCategories());
        setMessage2(`Успешно удалена категория с id ${item.id}`);
    }

    const [message3, setMessage3] = useState("");


    const handleDeleteBrand = (item) => async (e) => {
        e.preventDefault();
        await dispatch(deleteBrand(item));
        await dispatch(fetchBrands());
        setMessage3(`Успешно удален бренд с id ${item.id}`);
    }

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);
    const products = useSelector(state => state.products.products);
    const [showFull, setShowFull] = useState(false);
    const [message4, setMessage4] = useState("");

    const handleDeleteProduct = (item) => async (e) => {
        e.preventDefault();
        await dispatch(deleteProduct(item.id));
        await dispatch(fetchProducts());
        setMessage4(`Успешно удален продукт с id ${item.id}`);
    }

    const handleShowAllInfoAboutProduct = () => {
        setShowFull(!showFull);
    }


    const [colors, setColors] = useState([]);
    const [colorInput, setColorInput] = useState("");
    const [sizeInput, setSizeInput] = useState("");
    const [stockInput, setStockInput] = useState("");
    const [selectedColorIndex, setSelectedColorIndex] = useState(null);


    const handleAddNewProduct = (e) => {
        e.preventDefault();

        const form = e.target;

        // Получаем значения из формы по имени
        const sku = form.sku.value.trim();
        const name = form.name.value.trim();
        const description = form.description.value.trim();
        const brandId = Number(form.brandId.value.trim());
        const categoryId = Number(form.categoryId.value.trim());
        const basePrice = Number(form.basePrice.value.trim());
        const sex = form.sex.value.trim();
        const src = form.src.value.trim();



        // Формируем объект нового продукта
        const newProduct = {
            id: Date.now().toString(), // или другой способ генерации id
            sku,
            name,
            description,
            brandId,
            categoryId,
            basePrice,
            createdAt: new Date().toISOString(),
            isActive: true,
            categories: [], // если нужно, можно добавить логику для заполнения
            sex,
            line_for_page: [], // если нужно, можно добавить логику для заполнения
            src,
            colors: colors.map(c => ({
            color: c.color,
            sizes: c.sizes.map(s => ({
                size: s.size,
                stock: s.stock
            }))
            })),
            reviews: [] // пустой массив, можно заполнить позже
        };

        console.log("Новый продукт:", newProduct);

        dispatch(addProduct(newProduct));

        form.reset();
        setColors([]);
        setSelectedColorIndex(null);
        setColorInput("");
        setSizeInput("");
        setStockInput("");
    };


    const handleAddNewColor = (e) => {
        e.preventDefault();
        if (!colorInput.trim()) return;
        setColors([
            ...colors,
            { color: colorInput, sizes: [] }
        ]);
        setColorInput("");
    }

    const handleAddSizeToColor = (e) => {
        e.preventDefault();
        if (selectedColorIndex === null || !sizeInput.trim() || !stockInput.trim()) return;

        setColors(colors.map((item, idx) => {
        if (idx === selectedColorIndex) {
            // Проверка на дублирование размера
            if (item.sizes.some(s => s.size === sizeInput)) return item;
            return {
            ...item,
            sizes: [...item.sizes, { size: sizeInput, stock: Number(stockInput) }]
            };
        }
        return item;
        }));
        setSizeInput("");
        setStockInput("");
    };

    const handleSelectColor = (idx) => {
        setSelectedColorIndex(idx);
    };


    
 
    return (
        <div className="CMS-container">
            <div className="CMS-title">
                <h3>ЭТО СТРАНИЦА ДЛЯ МАНИПУЛЯЦИЙ С СЕРВЕРОМ (CMS)</h3>
            </div>

            <div className="add-new-brand">
                <h3>ТУТ ДОБАВЛЕНИЕ НОВОГО БРЕНДА</h3>
                <form onSubmit={handleAddBrand}>
                    <input placeholder="Название бренда" value={brandName} onChange={(e) => setBrandName(e.target.value)}/>
                    <input placeholder="Slug бренда" value={brandSlug} onChange={(e) => setBrandSlug(e.target.value)}/>
                    <button type="submit">ДОБАВИТЬ</button>
                </form>
                {message && <p>{message}</p>}
            </div>

            <div className="add-new-brand">
                <h3>ТУТ ДОБАВЛЕНИЕ НОВОЙ КАТЕГОРИИ</h3>
                <form onSubmit={handleAddCategory}>
                    <input placeholder="Название категории" value={categoryName} onChange={(e) => setCategoryName(e.target.value)}/>
                    <input placeholder="Slug категории" value={categorySlug} onChange={(e) => setCategorySlug(e.target.value)}/>
                    <button type="submit">ДОБАВИТЬ</button>
                </form>
                {message1 && <p>{message1}</p>}
            </div>

            <div className="categories">
                <h3>ТУТ ПОКАЗ ВСЕХ КАТЕГОРИЙ ИЗ БАЗЫ ДАННЫХ С ВОЗМОЖНОСТЬЮ УДАЛЕНИЯ</h3>
                {categories.map(item => (
                    <div className="category-alone">
                        <div>id: {item.id} </div>
                        <div>name: {item.name} </div>
                        <div>slug: {item.slug} </div>
                        <div>parentId: {item.parentId} </div>
                        <button onClick={handleDeleteCategory(item)}>X</button>
                    </div>
                ))}
                {message2 && <p>{message2}</p>}
            </div>

            <div className="categories">
                <h3>ТУТ ПОКАЗ ВСЕХ БРЕНДОВ ИЗ БАЗЫ ДАННЫХ С ВОЗМОЖНОСТЬЮ УДАЛЕНИЯ</h3>
                {brands.map(item => (
                    <div className="category-alone">
                        <div>id: {item.id} </div>
                        <div>name: {item.name} </div>
                        <div>slug: {item.slug} </div>
                        <button onClick={handleDeleteBrand(item)}>X</button>
                    </div>
                ))}
                {message3 && <p>{message3}</p>}
            </div>

            <div className="categories">
                <h3>ТУТ ПОКАЗ ВСЕХ ПРОДУКТОВ ИЗ БАЗЫ ДАННЫХ С ВОЗМОЖНОСТЬЮ УДАЛЕНИЯ</h3>
                {products.map(item => (
                    <div className="category-alone">
                        <div>id: {item.id}</div>
                        <div>sku: {item.sku}</div>
                        <div onClick={handleShowAllInfoAboutProduct}>name: {item.name}</div>
                        {showFull ?
                            <div>
                                <div>description: {item.description}</div>
                                <div>brand: {brands[item.brandId - 1].name}</div>
                                <div>category: {categories[item.categoryId - 1].name}</div>
                                <div>price: {item.basePrice}</div>
                            </div>
                        : ""}
                        <button onClick={handleDeleteProduct(item)}>X</button>
                    </div>
                ))}
                {message4 && <p>{message4}</p>}
            </div>

            <div className="add-new-brand">
                <h3>ТУТ ДОБАВЛЕНИЕ НОВОГО ТОВАРА</h3>
                <form onSubmit={handleAddNewProduct}>
                    <input name="sku" placeholder="sku" />
                    <input name="name" placeholder="name" />
                    <textarea name="description" placeholder="description" />
                    <input name="brandId" placeholder="brandId" />
                    <input name="categoryId" placeholder="categoryId" />
                    <input name="basePrice" placeholder="basePrice" />
                    <input name="sex" placeholder="sex" />
                    <textarea name="src" placeholder="src" />

                    <div>
                        <h4>ДОБАВЛЕНИЕ ЦВЕТОВ</h4>
                        {/* Кнопка для добавления цвета */}
                        <input name="color" placeholder="color" value={colorInput} onChange={e => setColorInput(e.target.value)}/>
                        <button type="button" onClick={handleAddNewColor}>ДОБАВИТЬ</button>
                    </div>

                    <ul>
                        {colors.map((item, idx) => (
                        <li key={idx}>
                            <span
                            style={{
                                fontWeight: selectedColorIndex === idx ? "bold" : "normal",
                                cursor: "pointer"
                            }}
                            onClick={() => handleSelectColor(idx)}
                            >
                            {item.color}
                            </span>
                            <ul>
                            {item.sizes.map((s, i) => (
                                <li key={i}>Размер: {s.size}, Остаток: {s.stock}</li>
                            ))}
                            </ul>
                        </li>
                        ))}
                    </ul>

                    <div>
                        <h4>ДОБАВЛЕНИЕ РАЗМЕРОВ К ЦВЕТАМ</h4>
                        {/* Кнопка для добавления размера */}
                        <input name="size" placeholder="size" value={sizeInput} onChange={e => setSizeInput(e.target.value)}/>
                        <input name="stock" placeholder="stock" value={stockInput} onChange={e => setStockInput(e.target.value)}/>
                        <button type="button" onClick={handleAddSizeToColor} disabled={selectedColorIndex === null}>ДОБАВИТЬ</button>
                        {selectedColorIndex === null && <div>Выберите цвет для добавления размера!</div>}
                    </div>

                    <button type="submit">ДОБАВИТЬ</button>
                </form>
            </div>

            <div className="add-new-product">
                <form>
                    <input placeholder="Название продукта" />
                    <input placeholder="Бренд"/>
                </form>
            </div>
        </div>
    );
};