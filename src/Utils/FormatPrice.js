

function revertString(str) {
    return (str === '') ? '' : revertString(str.substr(1)) + str.charAt(0);
}


const format = price => {

    let strPrice = price.toString()
    let count = 0;
    let result = ''

    for (let i = strPrice.length - 1; i > 0; i--) {
        count++
        result += strPrice[i]
        if (count === 3) {
            result += ','
            count = 0
        }
    }
    result += strPrice[0]
    return revertString(result)
}


export default format