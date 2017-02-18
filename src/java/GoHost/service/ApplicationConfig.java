/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package GoHost.service;

import java.util.Set;
import javax.ws.rs.core.Application;

/**
 *
 * @author Jerry
 */
@javax.ws.rs.ApplicationPath("api")
public class ApplicationConfig extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();
        addRestResourceClasses(resources);
        return resources;
    }

    /**
     * Do not modify addRestResourceClasses() method.
     * It is automatically populated with
     * all resources defined in the project.
     * If required, comment out calling this method in getClasses().
     */
    private void addRestResourceClasses(Set<Class<?>> resources) {
        resources.add(GoHost.service.AttendeeFacadeREST.class);
        resources.add(GoHost.service.CategoryFacadeREST.class);
        resources.add(GoHost.service.EventFacadeREST.class);
        resources.add(GoHost.service.FriendFacadeREST.class);
        resources.add(GoHost.service.InvitedFacadeREST.class);
        resources.add(GoHost.service.LocationFacadeREST.class);
        resources.add(GoHost.service.MessageFacadeREST.class);
        resources.add(GoHost.service.NotificationFacadeREST.class);
        resources.add(GoHost.service.ProfileFacadeREST.class);
        resources.add(GoHost.service.UserFacadeREST.class);
    }
    
}
