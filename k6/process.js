import { check, group } from 'k6';
import http from "k6/http";
import { URL } from "https://jslib.k6.io/url/1.0.0/index.js";

export let options = {stages:[{duration: "1s", target:1}]};
let fileContent = open("./uploads/file.xlsx", "b");

export default function () {
    group("1. Upload EXCEL file", (_) => {
        const params = {
            headers: {
                "Content-Type": "application/octet-stream"
            }
        };


        let uploadUrl = `https://localhost:44301/WeatherForecast?name=x-${Date.now()}.xlsx`;
        let data = {
            file:http.file(fileContent)
        }

        var res = http.post(uploadUrl, data, params);

        check(res,{
            "Upload Excel 200": (res) => res.status === 200
        });

        console.log(res.body)
    });
}