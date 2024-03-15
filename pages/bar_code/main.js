/**
 * Import STRICH SDK via ES6 import clause. It is recommended to pin a specific version, especially for
 * business-critical applications.
 */
import {StrichSDK, BarcodeReader} from "https://cdn.jsdelivr.net/npm/@pixelverse/strichjs-sdk@1.4.4";

/**
 * Add detected code to DOM
 */
function addResult(codeDetection) {
    const resultElement = document.createElement('span');
    resultElement.innerHTML = codeDetection.data;
    document.getElementById('results').appendChild(resultElement);
}
async function loadData(code){

    const url = 'https://world.openfoodfacts.org/api/v0/product/'+code.data;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const text = await response.text();
    let responseJson= JSON.parse(text)


    document.getElementById("product_image").src = responseJson.product.image_url;
    document.getElementById("score").innerText = responseJson.ingredients[0].text;
    

}

/**
 * Initialize STRICH BarcodeReader and start scanning.
 */
function initializeBarcodeReader() {
    let configuration = {
        selector: '.scanner',
        engine: {
            // all 1D symbologies
            symbologies: [
                'databar', 'databar-exp', 'code128', 'code39', 'code93', 'i25', 'codabar',
                'ean13', 'ean8', 'upca', 'upce', 'i25'
            ],
            numScanlines: 15,
            minScanlinesNeeded: 2,
            duplicateInterval: 1500
        },
        locator: {
            regionOfInterest: {
                left: 0.05, right: 0.05, top: 0.3, bottom: 0.3 // narrow RoE for 1D
            }
        },
        frameSource: {
            resolution: 'full-hd'
        },
        overlay: {
            showCameraSelector: true,
            showFlashlight: true,
            showDetections: false
        },
        feedback: {
            audio: true,
            vibration: true
        }
    };


    new BarcodeReader(configuration).initialize()
        .then(barcodeReader => {

            // store the BarcodeReader in a global, to be able to access it later (e.g. to destroy it)
            window['barcodeReader'] = barcodeReader;
            barcodeReader.detected = (detections) => {

                loadData(detections[0]);
            };
            barcodeReader.start().then(() => {
                console.log(`BarcodeReader.start() succeeded`);
            }).catch(err => {
                console.error(`BarcodeReader.start() failed: ${err}`);
            });
        })
        .catch(error => {
            console.error(`Initialization error: ${error}`);
        });
}

/**
 * Initialize STRICH SDK, and if successful, proceed to initialize BarcodeReader.
 */
StrichSDK.initialize('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MWY1ODUyMi1iZmVmLTQ0ZmMtODQxMC0wM2VlMmFhY2VlZWYiLCJpc3MiOiJzdHJpY2guaW8iLCJhdWQiOlsiaHR0cHM6Ly9vcHRpZm9vZGdhbWUuY2giXSwiaWF0IjoxNzEwNDkzODIxLCJuYmYiOjE3MTA0OTM4MjEsImNhcGFiaWxpdGllcyI6e30sInZlcnNpb24iOjF9.-EyZQIC_xxsHKlqHDCOMbWYUb5vJHoT1_gvgSADg2Xg')
    .then(() => {
        initializeBarcodeReader();
    })
    .catch(err => {
        window.alert('SDK failed to initialize: ' + err);
    });
