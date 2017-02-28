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
@Table(name = "friend")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Friend.findAll", query = "SELECT f FROM Friend f")
    , @NamedQuery(name = "Friend.findByIdfriend", query = "SELECT f FROM Friend f WHERE f.idfriend = :idfriend")
    , @NamedQuery(name = "Friend.findByIduser1", query = "SELECT f FROM Friend f WHERE f.iduser1 = :iduser1")
    , @NamedQuery(name = "Friend.findByIduser2", query = "SELECT f FROM Friend f WHERE f.iduser2 = :iduser2")})
public class Friend implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idfriend")
    private Integer idfriend;
    @Column(name = "iduser1")
    private Integer iduser1;
    @Column(name = "iduser2")
    private Integer iduser2;

    public Friend() {
    }

    public Friend(Integer idfriend) {
        this.idfriend = idfriend;
    }

    public Integer getIdfriend() {
        return idfriend;
    }

    public void setIdfriend(Integer idfriend) {
        this.idfriend = idfriend;
    }

    public Integer getIduser1() {
        return iduser1;
    }

    public void setIduser1(Integer iduser1) {
        this.iduser1 = iduser1;
    }

    public Integer getIduser2() {
        return iduser2;
    }

    public void setIduser2(Integer iduser2) {
        this.iduser2 = iduser2;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idfriend != null ? idfriend.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Friend)) {
            return false;
        }
        Friend other = (Friend) object;
        if ((this.idfriend == null && other.idfriend != null) || (this.idfriend != null && !this.idfriend.equals(other.idfriend))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "GoHost.Friend[ idfriend=" + idfriend + " ]";
    }
    
}
