export default class Utils {
    static isImageFileName(name: string): boolean {
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
        const fileExtension = name.split('.').pop()?.toLowerCase();

        if (fileExtension && imageExtensions.includes(fileExtension)) {
            return true;
        }
        return false;
    }
}