/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package GoHost;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Jerry
 */
@Entity
@Table(name = "attendee")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Attendee.findAll", query = "SELECT a FROM Attendee a")
    , @NamedQuery(name = "Attendee.findByIdattendee", query = "SELECT a FROM Attendee a WHERE a.idattendee = :idattendee")
    , @NamedQuery(name = "Attendee.findByIduser", query = "SELECT a FROM Attendee a WHERE a.iduser = :iduser")
    , @NamedQuery(name = "Attendee.findByIdevent", query = "SELECT a FROM Attendee a WHERE a.idevent = :idevent")})
public class Attendee implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = true)
    @Column(name = "idattendee")
    private Integer idattendee;
    @Column(name = "iduser")
    private Integer iduser;
    @Column(name = "idevent")
    private Integer idevent;

    public Attendee() {
    }

    public Attendee(Integer idattendee) {
        this.idattendee = idattendee;
    }

    public Integer getIdattendee() {
        return idattendee;
    }

    public void setIdattendee(Integer idattendee) {
        this.idattendee = idattendee;
    }

    public Integer getIduser() {
        return iduser;
    }

    public void setIduser(Integer iduser) {
        this.iduser = iduser;
    }

    public Integer getIdevent() {
        return idevent;
    }

    public void setIdevent(Integer idevent) {
        this.idevent = idevent;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idattendee != null ? idattendee.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Attendee)) {
            return false;
        }
        Attendee other = (Attendee) object;
        if ((this.idattendee == null && other.idattendee != null) || (this.idattendee != null && !this.idattendee.equals(other.idattendee))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "GoHost.Attendee[ idattendee=" + idattendee + " ]";
    }
    
}
