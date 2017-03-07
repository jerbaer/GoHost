/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package GoHost.service;

import GoHost.Notification;
import java.util.ArrayList;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author Jerry
 */
@Stateless
@Path("notification")
public class NotificationFacadeREST extends AbstractFacade<Notification> {

    @PersistenceContext(unitName = "GoHostPU")
    private EntityManager em;

    public NotificationFacadeREST() {
        super(Notification.class);
    }

    @POST
    @Override
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void create(Notification entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Integer id, Notification entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        super.remove(super.find(id));
    }
    
    @DELETE
    @Path("delete")
    public void removeByEvent(@QueryParam("idevent") Integer id) {
        List<Notification> list = em.createNamedQuery("Notification.findByIdevent", Notification.class).setParameter("idevent", new Integer(id)).getResultList();
        for (int i = 0; i<list.size(); i++){
            super.remove(super.find(list.get(i).getIdnotification()));
        }
    }

    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public Notification find(@PathParam("id") Integer id) {
        return super.find(id);
    }
    @GET
    @Path("idevent")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Notification> getOpen(@QueryParam("idevent") int vis){
        return em.createNamedQuery("Notification.findByIdevent", Notification.class).setParameter("idevent", new Integer(vis)).getResultList();
    }
    @GET
    @Path("iduser")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<Notification> findFriends(@QueryParam("iduser") Integer id) {
        return em.createNamedQuery("Notification.findByIduser", Notification.class).setParameter("iduser", id).getResultList();
    }
    @GET
    @Path("status")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Notification> getReports(@QueryParam("status") int vis){
        return em.createNamedQuery("Notification.findByNotificationstatus", Notification.class).setParameter("notificationstatus", new Integer(vis)).getResultList();
    }
    @GET
    @Path("sender")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<Notification> findBySender(@QueryParam("sender") Integer id) {
        return em.createNamedQuery("Notification.findBySender", Notification.class).setParameter("sender", id).getResultList();
    }
    @GET
    @Path("checkNotification")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public String findByUserSenderStatus(@QueryParam("iduser") Integer id, @QueryParam("sender") Integer id1, @QueryParam("status") Integer id2){
        List<Notification> n = null;
        n = em.createNamedQuery("Notification.findByUserStatusSender", Notification.class).setParameter("iduser", id).setParameter("sender", id1).setParameter("notificationstatus", id2).getResultList();
        if (n.size()==0){
            return "1";
        }else return "0";
    }
    
    
    

    
 



    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<Notification> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return super.findRange(new int[]{from, to});
    }
    
    //iduser is an Integer here. I've kept everything the same way here cuz 
    //I don't know if changing it to int will fuck with the SQL or nah
    
    


    @GET
    @Path("count")
    @Produces(MediaType.TEXT_PLAIN)
    public String countREST() {
        return String.valueOf(super.count());
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }
    
}
