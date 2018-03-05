const removeDuplicates = (originalArray, objKey) => {
    var trimmedArray = [];
    var values = [];
    var value;

    for (var i = 0; i < originalArray.length; i++) {
        value = originalArray[i][objKey];

        if (values.indexOf(value) === -1) {
            trimmedArray.push(originalArray[i]);
            values.push(value);
        }
    }
    return trimmedArray;
}

const storeTags = Array.prototype.slice.call(document.querySelectorAll('.store-tags'), 0);
let storesArr = [];

storeTags.map((tag, i) => {    
    storesArr.push({
        index: i,
        value: tag.textContent
    });

    const filteredArr = removeDuplicates(storesArr, 'value');

    filteredArr.map(filtered => {
        storesArr.map(unfiltered => {
            if (filtered.index === i) {
                tag.classList.remove('hidden');
            }
        });
    });
});
