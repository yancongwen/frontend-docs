# 工具函数收集

- 图片下载，图片源地址要支持跨域
```js
/**
 * @desc 下载图片，图片源地址要支持跨域
 * @param url {String} 图片地址
 * @param name {String} 保存的文件名
*/
function downloadImage(url, name) {
    let img = new Image()
    img.src = url
    img.setAttribute('crossOrigin', 'Anonymous')
    img.onload = () => {
        let canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        let context = canvas.getContext('2d')
        context.drawImage(img, 0, 0, img.width, img.height)
        let dataURL = canvas.toDataURL()
        let aLink = document.createElement('a')
        aLink.href = dataURL
        aLink.download = name
        aLink.target = '_blank'
        aLink.click()
    }
}
```

- 获取图片宽高
```js
/**
 * @desc 文件上传时，选中上传的图片，判断其大小
 * @param file {String} input 标签选中的文件
 * @result {Promise}
*/
getImageSize(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function (e) {
            let image = new Image()
            image.src = e.target.result
            image.onload = function () {
                resolve([image.width, image.height])
            }
            image.onerror = function (e) {
                reject(e)
            }
        }
        reader.onerror = function (e) {
            reject(e)
        }
    })
}
```
