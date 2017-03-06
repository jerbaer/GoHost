/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package GoHost.service;

import GoHost.Invited;
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
@Path("invited")
public class InvitedFacadeREST extends AbstractFacade<Invited> {

    @PersistenceContext(unitName = "GoHostPU")
    private EntityManager em;

    public InvitedFacadeREST() {
        super(Invited.class);
    }

    @POST
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public int createNote(Invited entity) {
        super.create(entity);
        em.flush();
        return entity.getIduser();
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Integer id, Invited entity) {
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
        List<Invited> list = em.createNamedQuery("Invited.findByIdevent", Invited.class).setParameter("idevent", new Integer(id)).getResultList();
        for (int i = 0; i<list.size(); i++){
            super.remove(super.find(list.get(i).getIdinvited()));
        }
    }

    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public Invited find(@PathParam("id") Integer id) {
        return super.find(id);
    }
    
    //This might conflict with the 
    @GET
    @Path("idevent")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Invited> getUsersInvitedEvent(@QueryParam("idevent") int vis){
        return em.createNamedQuery("Invited.findByIdevent", Invited.class).setParameter("idevent", new Integer(vis)).getResultList();
   }
    @GET
    @Path("iduser")
    public List<Invited> getEventsUserIsInvitedTo(@QueryParam("iduser") int iduser){
        return em.createNamedQuery("Invited.findByIduser", Invited.class).setParameter("iduser", iduser).getResultList();
    
    }
    

    @GET
    @Path("all")
    @Override
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<Invited> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<Invited> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return super.findRange(new int[]{from, to});
    }

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
