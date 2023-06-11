export default class Utils {
    static isImageFile(name: string): boolean {
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
        const fileExtension = name.split('.').pop()?.toLowerCase();

        if (fileExtension && imageExtensions.includes(fileExtension)) {
            return true;
        }
        return false;
    }

    static isVideoFile(fileName: string): boolean {
        const videoExtensions = /\.(mp4|mov|avi|wmv|flv|mkv|mpg|mpeg|webm|3gp|rmvb|m4v|vob)$/i;
        return videoExtensions.test(fileName);
    }
}