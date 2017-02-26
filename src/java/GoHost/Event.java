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
import javax.persistence.Lob;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Jerry
 */
@Entity
@Table(name = "event")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Event.findAll", query = "SELECT e FROM Event e")
    , @NamedQuery(name = "Event.findByIdevent", query = "SELECT e FROM Event e WHERE e.idevent = :idevent")
    , @NamedQuery(name = "Event.findByTitle", query = "SELECT e FROM Event e WHERE e.title = :title")
    , @NamedQuery(name = "Event.findByIdhost", query = "SELECT e FROM Event e WHERE e.idhost = :idhost")
    , @NamedQuery(name = "Event.findByMaxattendees", query = "SELECT e FROM Event e WHERE e.maxattendees = :maxattendees")
    , @NamedQuery(name = "Event.findByIdlocation", query = "SELECT e FROM Event e WHERE e.idlocation = :idlocation")
    , @NamedQuery(name = "Event.findByVisibility", query = "SELECT e FROM Event e WHERE e.visibility = :visibility")
    , @NamedQuery(name = "Event.findByAccessibility", query = "SELECT e FROM Event e WHERE e.accessibility = :accessibility")
    , @NamedQuery(name = "Event.findByStarttime", query = "SELECT e FROM Event e WHERE e.starttime = :starttime")
    , @NamedQuery(name = "Event.findByEndtime", query = "SELECT e FROM Event e WHERE e.endtime = :endtime")
    , @NamedQuery(name = "Event.findByIdcategory", query = "SELECT e FROM Event e WHERE e.idcategory = :idcategory")
    , @NamedQuery(name = "Event.findByNumberattendees", query = "SELECT e FROM Event e WHERE e.numberattendees = :numberattendees")})
public class Event implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = true)
    @NotNull
    @Column(name = "idevent")
    private Integer idevent;
    @Basic(optional = true)
    @NotNull
    @Size(min = 1, max = 45)
    @Column(name = "title")
    private String title;
    @Basic(optional = false)
    @NotNull
    @Column(name = "idhost")
    private int idhost;
    @Column(name = "maxattendees")
    private Integer maxattendees;
    @Column(name = "idlocation")
    private Integer idlocation;
    @Column(name = "visibility")
    private Integer visibility;
    @Column(name = "accessibility")
    private Integer accessibility;
    @Column(name = "starttime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date starttime;
    @Column(name = "endtime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date endtime;
    @Lob
    @Size(max = 2147483647)
    @Column(name = "description")
    private String description;
    @Column(name = "idcategory")
    private Integer idcategory;
    @Column(name = "numberattendees")
    private Integer numberattendees;

    public Event() {
    }

    public Event(Integer idevent) {
        this.idevent = idevent;
    }

    public Event(Integer idevent, String title, int idhost) {
        this.idevent = idevent;
        this.title = title;
        this.idhost = idhost;
    }

    public Integer getIdevent() {
        return idevent;
    }

    public void setIdevent(Integer idevent) {
        this.idevent = idevent;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getIdhost() {
        return idhost;
    }

    public void setIdhost(int idhost) {
        this.idhost = idhost;
    }

    public Integer getMaxattendees() {
        return maxattendees;
    }

    public void setMaxattendees(Integer maxattendees) {
        this.maxattendees = maxattendees;
    }

    public Integer getIdlocation() {
        return idlocation;
    }

    public void setIdlocation(Integer idlocation) {
        this.idlocation = idlocation;
    }

    public Integer getVisibility() {
        return visibility;
    }

    public void setVisibility(Integer visibility) {
        this.visibility = visibility;
    }

    public Integer getAccessibility() {
        return accessibility;
    }

    public void setAccessibility(Integer accessibility) {
        this.accessibility = accessibility;
    }

    public Date getStarttime() {
        return starttime;
    }

    public void setStarttime(Date starttime) {
        this.starttime = starttime;
    }

    public Date getEndtime() {
        return endtime;
    }

    public void setEndtime(Date endtime) {
        this.endtime = endtime;
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

    public Integer getNumberattendees() {
        return numberattendees;
    }

    public void setNumberattendees(Integer numberattendees) {
        this.numberattendees = numberattendees;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idevent != null ? idevent.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Event)) {
            return false;
        }
        Event other = (Event) object;
        if ((this.idevent == null && other.idevent != null) || (this.idevent != null && !this.idevent.equals(other.idevent))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "GoHost.Event[ idevent=" + idevent + " ]";
    }
    
}
