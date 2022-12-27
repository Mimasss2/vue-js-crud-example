import http from "../http-common";

class VolunteerDataService {

    createUser(data) {
        return http.post("/user/insertUser", data);
    }

    signInUser(userName, pwd) {
        return http.get(`/user/signinUser?userName=${userName}&pwd=${pwd}`);
    }

    createAdmin(data) {
        return http.post("/admin/insertAdmin", data);
    }

    signInAdmin(userName, pwd) {
        return http.get(`/admin/signinAdmin?adminName=${userName}&pwd=${pwd}`);
    }

    update(id, data) {
        return http.put(`/tutorials/${id}`, data);
    }

    getAllActivities() {
        return http.get(`/activity/all`);
    }

    apply(data) {
        return http.post("/application/add", data);
    }

    showAppForAdmin(adminId) {
        return http.get(`/application/getAppByAdminId?adminId=${adminId}`);
    }

    updateAppStatus(appId, appStatus) {
        return http.get(`/application/updateStatus?appId=${appId}&appStatus=${appStatus}`);
    }


}

export default new VolunteerDataService();
