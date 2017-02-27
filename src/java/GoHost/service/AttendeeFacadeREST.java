/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package GoHost.service;

import GoHost.Attendee;
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
@Path("attendee")
public class AttendeeFacadeREST extends AbstractFacade<Attendee> {

    @PersistenceContext(unitName = "GoHostPU")
    private EntityManager em;

    public AttendeeFacadeREST() {
        super(Attendee.class);
    }

    @POST
    @Override
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void create(Attendee entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Integer id, Attendee entity) {
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
        List<Attendee> list = em.createNamedQuery("Attendee.findByIdevent", Attendee.class).setParameter("idevent", new Integer(id)).getResultList();
        for (int i = 0; i<list.size(); i++){
            super.remove(super.find(list.get(i).getIdattendee()));
        }
    }

    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public Attendee find(@PathParam("id") Integer id) {
        return super.find(id);
    }
    @GET
    @Path("iduser")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Attendee> getAttending(@QueryParam("iduser") int vis){
        return em.createNamedQuery("Attendee.findByIduser", Attendee.class).setParameter("iduser", new Integer(vis)).getResultList();
   }

    /*@GET
    @Override
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<Attendee> findAll() {
        return super.findAll();
    }*/

    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<Attendee> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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
