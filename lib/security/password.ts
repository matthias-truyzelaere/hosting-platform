export function generateStrongPassword(): string {
    const length = 12
    const lowercase = true
    const uppercase = true
    const numbers = true
    const symbols = true

    const charSets: { type: string; chars: string }[] = []

    if (lowercase) charSets.push({ type: 'lower', chars: 'abcdefghijklmnopqrstuvwxyz' })
    if (uppercase) charSets.push({ type: 'upper', chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' })
    if (numbers) charSets.push({ type: 'number', chars: '0123456789' })
    if (symbols) charSets.push({ type: 'symbol', chars: '!@#&()_+=-[]{}|;\':",./<>?' })

    if (charSets.length === 0) {
        throw new Error('Internal error: No character sets defined.')
    }

    if (length < charSets.length) {
        throw new Error(`Internal error: Password length (${length}) is too short for required types.`)
    }

    const getRandomByte = (): number => {
        if (typeof window === 'undefined' || !window.crypto) {
            throw new Error('window.crypto is not available. This function can only be run in the browser.')
        }
        const randomByteArray = new Uint8Array(1)
        window.crypto.getRandomValues(randomByteArray)
        return randomByteArray[0]
    }

    const getRandomChar = (charSet: string): string => {
        if (!charSet) return ''
        const charSetLength = charSet.length
        const maxMultiple = Math.floor(256 / charSetLength) * charSetLength

        while (true) {
            const randomByte = getRandomByte()
            if (randomByte < maxMultiple) {
                return charSet[randomByte % charSetLength]
            }
        }
    }

    const passwordChars: string[] = []
    let fullCharset = ''

    charSets.forEach((set) => {
        const char = getRandomChar(set.chars)
        passwordChars.push(char)
        fullCharset += set.chars
    })

    const remainingLength = length - passwordChars.length
    for (let i = 0; i < remainingLength; i++) {
        passwordChars.push(getRandomChar(fullCharset))
    }

    for (let i = passwordChars.length - 1; i > 0; i--) {
        const maxMultiple = Math.floor(256 / (i + 1)) * (i + 1)
        let randomByte
        do {
            randomByte = getRandomByte()
        } while (randomByte >= maxMultiple)
        const j = randomByte % (i + 1)

        ;[passwordChars[i], passwordChars[j]] = [passwordChars[j], passwordChars[i]]
    }

    return passwordChars.join('')
}
