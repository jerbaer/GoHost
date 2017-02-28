/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package GoHost.service;

import GoHost.Notification;
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
    @Path("iduser")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Notification> getNotifications(@QueryParam("iduser") int vis){
        return em.createNamedQuery("Notification.findByIduser", Notification.class).setParameter("iduser", new Integer(vis)).getResultList();
    } 

    @GET
    @Override
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<Notification> findAll() {
        return super.findAll();
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
