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
    , @NamedQuery(name = "Notification.findBySender", query = "SELECT n FROM Notification n WHERE n.sender = :sender")
    , @NamedQuery(name = "Notification.findByIdevent", query = "SELECT n FROM Notification n WHERE n.idevent = :idevent")
    , @NamedQuery(name = "Notification.findByNotificationstatus", query = "SELECT n FROM Notification n WHERE n.notificationstatus = :notificationstatus")
    , @NamedQuery(name = "Notification.findByisRead", query = "SELECT n FROM Notification n WHERE n.isread = :isread")
    , @NamedQuery(name = "Notification.findByTimesent", query = "SELECT n FROM Notification n WHERE n.timesent = :timesent")})
public class Notification implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = true)
    @Column(name = "idnotification")
    private Integer idnotification;
    @Column(name = "iduser")
    private Integer iduser;
    @Column(name = "sender")
    private Integer sender;
    @Column(name = "idevent")
    private Integer idevent;
    @Column(name = "notificationstatus")
    private Integer notificationstatus;
    @Column(name = "isread")
    private Integer isread;
    @Column(name = "timesent")
    @Temporal(TemporalType.TIMESTAMP)
    private Date timesent;

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

    public Integer getSender() {
        return sender;
    }

    public void setSender(Integer sender) {
        this.sender = sender;
    }

    public Integer getIdevent() {
        return idevent;
    }

    public void setIdevent(Integer idevent) {
        this.idevent = idevent;
    }

    public Integer getNotificationstatus() {
        return notificationstatus;
    }

    public void setNotificationstatus(Integer notificationstatus) {
        this.notificationstatus = notificationstatus;
    }

    public Integer getIsread() {
        return isread;
    }

    public void setIsread(Integer isread) {
        this.isread = isread;
    }

    public Date getTimesent() {
        return timesent;
    }

    public void setTimesent(Date timesent) {
        this.timesent = timesent;
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
