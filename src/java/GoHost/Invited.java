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
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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
@Table(name = "invited")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Invited.findAll", query = "SELECT i FROM Invited i")
    , @NamedQuery(name = "Invited.findByIdinvited", query = "SELECT i FROM Invited i WHERE i.idinvited = :idinvited")
    , @NamedQuery(name = "Invited.findByIduser", query = "SELECT i FROM Invited i WHERE i.iduser = :iduser")
    , @NamedQuery(name = "Invited.findByIdevent", query = "SELECT i FROM Invited i WHERE i.idevent = :idevent")})
public class Invited implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idinvited")
    private Integer idinvited;
    @Column(name = "iduser")
    private Integer iduser;
    @Column(name = "idevent")
    private Integer idevent;

    public Invited() {
    }

    public Invited(Integer idinvited) {
        this.idinvited = idinvited;
    }

    public Integer getIdinvited() {
        return idinvited;
    }

    public void setIdinvited(Integer idinvited) {
        this.idinvited = idinvited;
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
        hash += (idinvited != null ? idinvited.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Invited)) {
            return false;
        }
        Invited other = (Invited) object;
        if ((this.idinvited == null && other.idinvited != null) || (this.idinvited != null && !this.idinvited.equals(other.idinvited))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "GoHost.Invited[ idinvited=" + idinvited + " ]";
    }
    
}
