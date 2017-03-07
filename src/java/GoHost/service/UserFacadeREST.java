/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package GoHost.service;

import GoHost.User;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.OPTIONS;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 *
 * @author Jerry
 */
@Stateless
@Path("user")
public class UserFacadeREST extends AbstractFacade<User> {


    @PersistenceContext(unitName = "GoHostPU")
    private EntityManager em;

    public UserFacadeREST() {
        super(User.class);
    }

    @POST
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public String createUser(User entity) {
        User other = null;
        try {
            other = em.createNamedQuery("User.findByName", User.class).setParameter("name", entity.getName()).getSingleResult();
        } catch (Exception ex) {
           
        }
        if(other != null)
            return "0";
        
        super.create(entity);
        em.flush();
        return entity.getIduser().toString();
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void editIdprofile(@PathParam("id") Integer id, User entity) {
        super.edit(entity);

    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        super.remove(super.find(id));
    }

    @GET
    @Path("{id}")
    @Produces({"application/json"})
    public User findUser(@PathParam("id") Integer id) {
        return em.createNamedQuery("User.findByIduser", User.class).setParameter("iduser", id).getSingleResult();
    }
    //This is new shit. Might throw problems. Might still
    @GET
    @Path("{name}")
    public List<User> searchForUser(@PathParam("name") String name) {
        return em.createNamedQuery("User.searchByName", User.class).setParameter("name", name).getResultList();
    }

    @GET
    @Produces({"text/plain"})
    public String checkUser(@QueryParam("email") String user, @QueryParam("password") String password) {
        User u = null;
        try {
            u = em.createNamedQuery("User.findByEmail", User.class).setParameter("email", user).getSingleResult();
        } catch (Exception ex) {
            return "0";
        }
        if (u.getPassword().equals(password)) {
            return u.getIduser().toString();
        } else {
            return "0";
        }
    }

    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<User> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return super.findRange(new int[]{from, to});
    }
    @GET
    @Path("admin")
    @Produces({MediaType.APPLICATION_JSON})
    public boolean isAdmin(@QueryParam("iduser") Integer id){
        User u = null;
        u = em.createNamedQuery("User.findByIduser", User.class).setParameter("iduser", id).getSingleResult();
        if (u.getAdmin() == 1) return true;
        else return false;
    }
    
    
    
    @GET
    @Path("all")
    @Override
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<User> findAll() {
        return super.findAll();
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
