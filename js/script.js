const btnMore = document.querySelector('.more');
const brandItemHidden = document.querySelectorAll('li.hidden');
let inputSearch = document.querySelector('.filter__search');
const rangeSlider = document.querySelector('.price__slider');
const input_0 = document.getElementById('input-0');
const input_1 = document.getElementById('input-1');
const products = document.querySelector('.products');
const btnReset = document.querySelector('.reset');

const inputsArr = [input_0, input_1];


const filterSearch = () => {
    inputSearch.addEventListener('keyup', () => {
        let filter = inputSearch.value.toLowerCase(),
            filterItem = document.querySelectorAll('.brand__item');
        filterItem.forEach(item => {
            if (item.innerHTML.toLowerCase().indexOf(filter) > -1) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        })
    })
};

filterSearch();

btnMore.addEventListener('click', function () {
    brandItemHidden.forEach(item => {
        item.classList.toggle('hidden');
    });
    btnMore.classList.toggle('close');
});


noUiSlider.create(rangeSlider, {
    start: [69, 57900],
    connect: true,
    range: {
        'min': 69,
        'max': 57900
    },

});
rangeSlider.noUiSlider.on('update', (values, handle) => {
    inputsArr[handle].value = Math.round(values[handle]);
    const descrSliderVal = [
        document.getElementById('val_0'),
        document.getElementById('val_1')
    ];
    descrSliderVal[handle].innerHTML = Math.round(values[handle]) + 'руб.';
});

const setRangeSlider = (num, value) => {
    let arrOfVal = [null, null];
    arrOfVal[num] = value;
    rangeSlider.noUiSlider.set(arrOfVal);
    getItemsFromPrice();
};

inputsArr.forEach((item, index) => {
    item.addEventListener('change', e => {
        setRangeSlider(index, e.currentTarget.value);
    });
});

rangeSlider.noUiSlider.on('change', () => {
    getItemsFromPrice();
});

const getItemsFromPrice = () => {
    const delay = ms => {
        return new Promise(res => {
            setTimeout(() =>
                res(), ms)
        })
    };
    products.innerHTML = '<p>Ищу товары...</p>';
    delay(1500).then(() => {
        products.innerHTML = '<p class="goods__card">Найдено 100 товаров</p>'
    });
};

btnReset.addEventListener('click', () => {
    window.location.reload();
});