/**
 * A utility method which converts seconds into TimeCode (i.e. 300 --> 05:00).
 *
 * @param {number} value - A number in seconds to be converted into a formatted time code.
 * @returns {string} A formatted time code string.
 */
export function convertToTimeCode(value: number) {
    value = Math.max(value, 0);

    let h = Math.floor(value / 3600);
    let m = Math.floor((value % 3600) / 60);
    let s = Math.floor((value % 3600) % 60);
    return (
        (h === 0 ? "" : h < 10 ? "0" + h.toString() + ":" : h.toString() + ":") +
        (m < 10 ? "0" + m.toString() : m.toString()) +
        ":" +
        (s < 10 ? "0" + s.toString() : s.toString())
    );
}
