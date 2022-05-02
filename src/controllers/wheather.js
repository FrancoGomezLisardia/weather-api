import { response, request } from 'express'
import fetch from 'node-fetch'

const { env } = process

const getData = async (URL) => {
    const res = await fetch(URL)
    if (!res.ok) throw new Error(`unexpected response ${res.statusText}`)
    return res.json()
}

const getCityDataFromIP = async (req) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    return getData(`${env.IP_API_URL}/${ip}`)
}

export const location = async (req = request, res = response) => {
    res.send(await getCityDataFromIP(req))
}

export const currenCity = async (req = request, res = response) => {
    let URL = ''
    if (req.params.city) {
        URL = `${env.OW_BASE_URL}/weather?q=${req.params.city}&appid=${env.OW_API_KEY}`
    } else {
        const { lat, lon } = await getCityDataFromIP(req)
        URL = `${env.OW_BASE_URLss}/weather?lat=${lat}&lon=${lon}&appid=${env.OW_API_KEY}`
    }
    res.send(getData(URL))
}

export const forecast = async (req = request, res = response) => {
    let URL = ''
    if (req.params.city) {
        URL = `${env.OW_BASE_URL}/forecast?q=${req.params.city}&appid=${env.OW_API_KEY}`
    } else {
        const { lat, lon } = await getCityDataFromIP(req)
        URL = `${env.OW_BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${env.OW_API_KEY}`
    }
    res.send(getData(URL))
}
