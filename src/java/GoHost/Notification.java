/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package GoHost;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Jerry
 */
@Entity
@Table(name = "notification")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Notification.findAll", query = "SELECT n FROM Notification n")
    , @NamedQuery(name = "Notification.findByIdnotification", query = "SELECT n FROM Notification n WHERE n.idnotification = :idnotification")
    , @NamedQuery(name = "Notification.findByIduser", query = "SELECT n FROM Notification n WHERE n.iduser = :iduser")
    , @NamedQuery(name = "Notification.findByFrom", query = "SELECT n FROM Notification n WHERE n.from = :from")
    , @NamedQuery(name = "Notification.findByIdevent", query = "SELECT n FROM Notification n WHERE n.idevent = :idevent")
    , @NamedQuery(name = "Notification.findByStatus", query = "SELECT n FROM Notification n WHERE n.status = :status")
    , @NamedQuery(name = "Notification.findByRead", query = "SELECT n FROM Notification n WHERE n.read = :read")
    , @NamedQuery(name = "Notification.findByTimestamp", query = "SELECT n FROM Notification n WHERE n.timestamp = :timestamp")})
public class Notification implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "idnotification")
    private Integer idnotification;
    @Column(name = "iduser")
    private Integer iduser;
    @Column(name = "from")
    private Integer from;
    @Column(name = "idevent")
    private Integer idevent;
    @Column(name = "status")
    private Integer status;
    @Column(name = "read")
    private Integer read;
    @Column(name = "timestamp")
    @Temporal(TemporalType.TIMESTAMP)
    private Date timestamp;

    public Notification() {
    }

    public Notification(Integer idnotification) {
        this.idnotification = idnotification;
    }

    public Integer getIdnotification() {
        return idnotification;
    }

    public void setIdnotification(Integer idnotification) {
        this.idnotification = idnotification;
    }

    public Integer getIduser() {
        return iduser;
    }

    public void setIduser(Integer iduser) {
        this.iduser = iduser;
    }

    public Integer getFrom() {
        return from;
    }

    public void setFrom(Integer from) {
        this.from = from;
    }

    public Integer getIdevent() {
        return idevent;
    }

    public void setIdevent(Integer idevent) {
        this.idevent = idevent;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getRead() {
        return read;
    }

    public void setRead(Integer read) {
        this.read = read;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idnotification != null ? idnotification.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Notification)) {
            return false;
        }
        Notification other = (Notification) object;
        if ((this.idnotification == null && other.idnotification != null) || (this.idnotification != null && !this.idnotification.equals(other.idnotification))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "GoHost.Notification[ idnotification=" + idnotification + " ]";
    }
    
}
