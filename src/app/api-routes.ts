import { environment } from '../environments/environment';

export class ApiRoute {
    private static readonly BaseUrl = `${environment.apiHost}`;
    public static readonly APPSERVICEHOST = `${environment.appServiceHost}`;

    public static readonly AUTH = {
        register: () => `${ApiRoute.BaseUrl}/auth/register`,
        login: () => `${ApiRoute.BaseUrl}/auth/login`,
        currentUser: () => `${ApiRoute.BaseUrl}/auth/currentUser`
    }

    public static readonly USER = {
        getUsers: () => `${ApiRoute.BaseUrl}/users/`,
        getUser: (userId: number) => `${ApiRoute.BaseUrl}/users/${userId}`,
        postUser: () => `${ApiRoute.BaseUrl}/users/`,
        putUser: (userId: number) => `${ApiRoute.BaseUrl}/users/${userId}`,
        deleteUser: (userId: number) => `${ApiRoute.BaseUrl}/users/${userId}`
    }

    public static readonly RESOURCETYPE = {
        getResourceTypes: () => `${ApiRoute.BaseUrl}/resource-types/`,
        getResourceType: (resourceTypeId: number) => `${ApiRoute.BaseUrl}/resource-types/${resourceTypeId}`,
        postResourceType: () => `${ApiRoute.BaseUrl}/resource-types/`,
        putResourceType: (resourceTypeId: number) => `${ApiRoute.BaseUrl}/resource-types/${resourceTypeId}`,
        deleteResourceType: (resourceTypeId: number) => `${ApiRoute.BaseUrl}/resource-types/${resourceTypeId}`
    }

    public static readonly RESOURCE = {
        getResources: () => `${ApiRoute.BaseUrl}/resources/`,
        getResource: (resourceId: number) => `${ApiRoute.BaseUrl}/resources/${resourceId}`,
        postResource: () => `${ApiRoute.BaseUrl}/resources/`,
        putResource: (resourceId: number) => `${ApiRoute.BaseUrl}/resources/${resourceId}`,
        deleteResource: (resourceId: number) => `${ApiRoute.BaseUrl}/resources/${resourceId}`,
        uploadResource: (resourceId: number) => `${ApiRoute.BaseUrl}/resources/upload/${resourceId}`,
        downloadResource: (resourceId: number) => `${ApiRoute.BaseUrl}/resources/download/${resourceId}`,
        getResourcesByUserId: (userId: number) => `${ApiRoute.BaseUrl}/resources/byUser/${userId}`
    }

    public static readonly ANNOUNCEMENT = {
        getAnnouncements: () => `${ApiRoute.BaseUrl}/announcements/`,
        getAnnouncement: (announcementId: number) => `${ApiRoute.BaseUrl}/announcements/${announcementId}`,
        postAnnouncement: () => `${ApiRoute.BaseUrl}/announcements/`,
        putAnnouncement: (announcementId: number) => `${ApiRoute.BaseUrl}/announcements/${announcementId}`,
        deleteAnnouncement: (announcementId: number) => `${ApiRoute.BaseUrl}/announcements/${announcementId}`
    }

    public static readonly COMMENT = {
        getComments: () => `${ApiRoute.BaseUrl}/comments/`,
        getComment: (commentId: number) => `${ApiRoute.BaseUrl}/comments/${commentId}`,
        postComment: () => `${ApiRoute.BaseUrl}/comments/`,
        putComment: (commentId: number) => `${ApiRoute.BaseUrl}/comments/${commentId}`,
        deleteComment: (commentId: number) => `${ApiRoute.BaseUrl}/comments/${commentId}`,
        getCommentsbyResource: (resourceId: number) => `${ApiRoute.BaseUrl}/comments/byResource/${resourceId}`
    }

    public static readonly USERFAVORITE = {
        getUserFavorites: () => `${ApiRoute.BaseUrl}/user-favorites/`,
        postUserFavorite: () => `${ApiRoute.BaseUrl}/user-favorites/`,
        deleteUserFavorite: (userFavoriteId: number) => `${ApiRoute.BaseUrl}/user-favorites/${userFavoriteId}`,
        getUserFavoritesbyUser: (userId: number) => `${ApiRoute.BaseUrl}/user-favorites/byUser/${userId}`
    }
}