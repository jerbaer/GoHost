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
import javax.persistence.Lob;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Jerry
 */
@Entity
@Table(name = "profile")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Profile.findAll", query = "SELECT p FROM Profile p")
    , @NamedQuery(name = "Profile.findByIdprofile", query = "SELECT p FROM Profile p WHERE p.idprofile = :idprofile")
    , @NamedQuery(name = "Profile.findByIduser", query = "SELECT p FROM Profile p WHERE p.iduser = :iduser")
    , @NamedQuery(name = "Profile.findByIdcategory", query = "SELECT p FROM Profile p WHERE p.idcategory = :idcategory"),
    @NamedQuery(name = "Profile.findByPicture", query = "SELECT p FROM Profile p WHERE p.picture = :picture")})
public class Profile implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idprofile")
    private Integer idprofile;
    @Column(name = "iduser")
    private Integer iduser;
    @Lob
    @Size(max = 2147483647)
    @Column(name = "description")
    private String description;
    @Column(name = "idcategory")
    private Integer idcategory;
    @Column (name = "picture")
    private String picture;

    public Profile() {
    }

    public Profile(Integer idprofile) {
        this.idprofile = idprofile;
    }

    public Integer getIdprofile() {
        return idprofile;
    }

    public void setIdprofile(Integer idprofile) {
        this.idprofile = idprofile;
    }
    public String getPicture(){
        return picture;
    }
    public void setPicture(String picture){
        this.picture = picture;
    }

    public Integer getIduser() {
        return iduser;
    }

    public void setIduser(Integer iduser) {
        this.iduser = iduser;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getIdcategory() {
        return idcategory;
    }

    public void setIdcategory(Integer idcategory) {
        this.idcategory = idcategory;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idprofile != null ? idprofile.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Profile)) {
            return false;
        }
        Profile other = (Profile) object;
        if ((this.idprofile == null && other.idprofile != null) || (this.idprofile != null && !this.idprofile.equals(other.idprofile))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "GoHost.Profile[ idprofile=" + idprofile + " ]";
    }
    
}
